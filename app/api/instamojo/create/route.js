import dbConnect from "@/lib/mongodb";
import { getUserFromToken } from "@/lib/auth";
import User from "@/models/User";
import axios from "axios";

export const dynamic = "force-dynamic";

export async function POST(req) {
  await dbConnect();

  const tokenUser = getUserFromToken();
  if (!tokenUser) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await User.findOne({ email: tokenUser.email });
  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  // 🔒 FINAL VALIDATION
  if (!/^[6-9]\d{9}$/.test(user.phone)) {
    return Response.json({
      error: "Invalid phone number in profile"
    }, { status: 400 });
  }

  const { amount } = await req.json();

  try {
    const res = await axios.post(
      "https://www.instamojo.com/api/1.1/payment-requests/",
      {
        purpose: "SatvikMeals Order",
        amount: amount.toString(),
        buyer_name: user.name,
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
      url: res.data.payment_request.longurl
    });

  } catch (err) {
    console.error("INSTAMOJO ERROR:", err.response?.data);
    return Response.json(
      { error: "Instamojo rejected buyer details" },
      { status: 500 }
    );
  }
}
