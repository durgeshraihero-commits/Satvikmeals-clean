import dbConnect from "@/lib/mongodb";
import Cart from "@/models/Cart";
import User from "@/models/User";
import { getUserFromToken } from "@/lib/auth";
import axios from "axios";
import { notifyAdmin } from "@/lib/notifyAdmin";

export async function POST() {
  try {
    await dbConnect();

    const tokenUser = getUserFromToken();
    if (!tokenUser?.email) {
      return Response.json({ error: "Not logged in" }, { status: 401 });
    }

    const user = await User.findOne({ email: tokenUser.email });
    if (!user || !user.phone) {
      return Response.json(
        { error: "User phone number missing" },
        { status: 400 }
      );
    }

    const cart = await Cart.findOne({ userEmail: tokenUser.email });
    if (!cart || cart.items.length === 0) {
      return Response.json({ error: "Cart is empty" }, { status: 400 });
    }

    const amount = cart.items.reduce(
      (sum, i) => sum + Number(i.price) * i.quantity,
      0
    );

    const itemsText = cart.items
      .map(i => `- ${i.name} × ${i.quantity}`)
      .join("\n");

    // 🔔 ADMIN NOTIFICATION
    await notifyAdmin(
      `🛒 Cart Payment Initiated

👤 Name: ${user.name || "N/A"}
📧 Email: ${user.email}
📞 Phone: ${user.phone}

📦 Items:
${itemsText}

💰 Amount: ₹${amount}`
    );

    const res = await axios.post(
      "https://www.instamojo.com/api/1.1/payment-requests/",
      {
        purpose: "SatvikMeals Order",
        amount: amount,
        buyer_name: user.name || "SatvikMeals User",
        email: user.email,
        phone: user.phone,
        redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
        send_email: false,
        send_sms: false,
        allow_repeated_payments: false,
      },
      {
        headers: {
          "X-Api-Key": process.env.INSTAMOJO_API_KEY,
          "X-Auth-Token": process.env.INSTAMOJO_AUTH_TOKEN,
        },
      }
    );

    return Response.json({
      url: res.data.payment_request.longurl,
    });
  } catch (err) {
    console.error("Instamojo Error:", err.response?.data || err.message);
    return Response.json(
      { error: "Payment gateway error" },
      { status: 500 }
    );
  }
}
