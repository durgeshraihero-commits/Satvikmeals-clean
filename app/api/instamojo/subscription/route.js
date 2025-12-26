import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { getUserFromToken } from "@/lib/auth";
import axios from "axios";

export async function POST(req) {
  try {
    await dbConnect();

    const userToken = getUserFromToken();
    if (!userToken?.email) {
      return Response.json({ error: "Not logged in" }, { status: 401 });
    }

    const user = await User.findOne({ email: userToken.email });
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    // 🔴 HARD FAIL IF AMOUNT INVALID
    const amount = 9; // subscription price
    if (!amount || isNaN(amount) || amount <= 0) {
      return Response.json(
        { error: "Invalid subscription amount" },
        { status: 400 }
      );
    }

    // ✅ Clean phone (VERY IMPORTANT)
    const phone = user.phone?.replace(/\D/g, "").slice(-10);
    if (!/^[6-9]\d{9}$/.test(phone)) {
      return Response.json(
        { error: "Invalid phone number" },
        { status: 400 }
      );
    }

    const res = await axios.post(
      "https://www.instamojo.com/api/1.1/payment-requests/",
      {
        purpose: "SatvikMeals Subscription",
        amount: amount.toString(),
        buyer_name: user.name || "SatvikMeals User",
        email: user.email,
        phone,
        redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?type=subscription`,
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
    console.error(
      "INSTAMOJO SUBSCRIPTION ERROR:",
      err.response?.data || err.message
    );

    return Response.json(
      { error: "Subscription payment failed" },
      { status: 500 }
    );
  }
}
