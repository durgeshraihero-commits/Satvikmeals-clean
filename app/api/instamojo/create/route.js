import dbConnect from "@/lib/mongodb";
import { getUserFromToken } from "@/lib/auth";
import User from "@/models/User";
import axios from "axios";

export const dynamic = "force-dynamic";

export async function POST(req) {
  await dbConnect();

  const userToken = getUserFromToken();
  if (!userToken) {
    return Response.json({ error: "Not logged in" }, { status: 401 });
  }

  const user = await User.findOne({ email: userToken.email });
  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const { amount } = await req.json();

  try {
    const res = await axios.post(
      "https://www.instamojo.com/api/1.1/payment-requests/",
      {
        purpose: "SatvikMeals Order",
        amount: amount,
        buyer_name: user.name || user.email.split("@")[0], // ✅ AUTO NAME
        email: user.email,                                  // ✅ AUTO EMAIL
        phone: user.phone,                                  // ✅ AUTO PHONE
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
      { error: "Payment creation failed" },
      { status: 500 }
    );
  }
}
