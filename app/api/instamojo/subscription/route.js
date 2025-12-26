import dbConnect from "@/lib/mongodb";
import Plan from "@/models/Plan";
import User from "@/models/User";
import axios from "axios";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { planId } = await req.json();

    if (!planId) {
      return Response.json({ error: "Plan ID missing" }, { status: 400 });
    }

    const token = cookies().get("token")?.value;
    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    await dbConnect();

    const user = await User.findById(decoded.id);
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const plan = await Plan.findById(planId);
    if (!plan) {
      return Response.json({ error: "Plan not found" }, { status: 404 });
    }

    const response = await axios.post(
      "https://www.instamojo.com/api/1.1/payment-requests/",
      {
        purpose: `SatvikMeals Subscription - ${plan.name}`,
        amount: plan.price.toString(),
        buyer_name: user.name || "SatvikMeals User",
        email: user.email,
        phone: user.phone || "9999999999",
        redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?type=subscription&plan=${plan._id}`,
        send_email: false,
        send_sms: false,
      },
      {
        headers: {
          "X-Api-Key": process.env.INSTAMOJO_API_KEY,
          "X-Auth-Token": process.env.INSTAMOJO_AUTH_TOKEN,
        },
      }
    );

    return Response.json({
      url: response.data.payment_request.longurl,
    });
  } catch (err) {
    console.error("INSTAMOJO ERROR:", err?.response?.data || err);
    return Response.json({ error: "Payment failed" }, { status: 500 });
  }
}
