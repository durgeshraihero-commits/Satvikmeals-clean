import dbConnect from "@/lib/mongodb";
import Subscription from "@/models/Subscription";
import Payment from "@/models/Payment";
import Plan from "@/models/Plan";
import User from "@/models/User";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req) {
  await dbConnect();

  // 1️⃣ Get logged-in user
  const token = cookies().get("token")?.value;
  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.userId);

  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  // 2️⃣ Read plan
  const { planId } = await req.json();
  const plan = await Plan.findById(planId);

  if (!plan) {
    return Response.json({ error: "Plan not found" }, { status: 404 });
  }

  // 3️⃣ Save payment
  await Payment.create({
    user: user._id,
    amount: plan.price,
    status: "success",
    method: "FAKE",
    paymentId: "DEV_" + Date.now(),
  });

  // 4️⃣ Activate subscription
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + plan.durationDays);

  await Subscription.findOneAndUpdate(
    { user: user._id },
    {
      user: user._id,
      plan: plan.name,
      expiresAt,
    },
    { upsert: true }
  );

  return Response.json({ success: true });
}
