import dbConnect from "@/lib/mongodb";
import Subscription from "@/models/Subscription";
import Payment from "@/models/Payment";
import Plan from "@/models/Plan";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const token = cookies().get("token")?.value;
  if (!token) return Response.json({ error: "Unauthorized" });

  const user = jwt.verify(token, process.env.JWT_SECRET);
  const { planId, payment_id } = await req.json();

  await dbConnect();

  const plan = await Plan.findById(planId);
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + plan.durationDays);

  await Subscription.create({
    user: user.userId,
    plan: planId,
    expiresAt,
  });

  await Payment.create({
    user: user.userId,
    amount: plan.price,
    provider: "Instamojo",
    paymentId: payment_id,
    status: "success",
  });

  return Response.json({ success: true });
}
