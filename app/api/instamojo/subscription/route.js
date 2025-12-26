import dbConnect from "@/lib/mongodb";
import Plan from "@/models/Plan";
import Payment from "@/models/Payment";
import { getUserFromToken } from "@/lib/auth";
import axios from "axios";

export async function POST(req) {
  await dbConnect();

  const user = getUserFromToken();
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { planId } = await req.json();
  const plan = await Plan.findById(planId);

  if (!plan) {
    return Response.json({ error: "Plan not found" }, { status: 404 });
  }

  const res = await axios.post(
    "https://www.instamojo.com/api/1.1/payment-requests/",
    {
      purpose: `Subscription: ${plan.name}`,
      amount: plan.price.toString(),
      buyer_name: user.email,
      email: user.email,
      redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/pending`,
    },
    {
      headers: {
        "X-Api-Key": process.env.INSTAMOJO_API_KEY,
        "X-Auth-Token": process.env.INSTAMOJO_AUTH_TOKEN,
      },
    }
  );

  await Payment.create({
    email: user.email,
    amount: plan.price,
    purpose: plan.name,
    requestId: res.data.payment_request.id,
    status: "pending",
    source: "subscription",
  });

  return Response.json({ url: res.data.payment_request.longurl });
}
