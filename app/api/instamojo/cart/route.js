import dbConnect from "@/lib/mongodb";
import Cart from "@/models/Cart";
import User from "@/models/User";
import axios from "axios";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST() {
  await dbConnect();

  // 🔐 get user from token
  const token = cookies().get("token")?.value;
  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({ email: decoded.email });

  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const cart = await Cart.findOne({ email: user.email });
  if (!cart || cart.items.length === 0) {
    return Response.json({ error: "Cart is empty" }, { status: 400 });
  }

  // 💰 calculate total
  const amount = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  try {
    const res = await axios.post(
      `${process.env.INSTAMOJO_BASE_URL}/payment-requests/`,
      {
        purpose: "SatvikMeals Cart Order",
        amount: amount.toString(),
        buyer_name: user.name || "Customer",
        email: user.email,
        phone: user.phone, // ✅ FIXED
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
      url: res.data.payment_request.longurl, // ✅ THIS WAS FAILING BEFORE
    });
  } catch (err) {
    console.error("Instamojo Cart Error:", err.response?.data || err.message);
    return Response.json({ error: "Payment failed" }, { status: 500 });
  }
}
