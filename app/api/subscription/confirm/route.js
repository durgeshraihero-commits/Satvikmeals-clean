import dbConnect from "@/lib/mongodb";
import Subscription from "@/models/Subscription";
import Plan from "@/models/Plan";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(req) {
  const token = cookies().get("token")?.value;
  if (!token) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const user = jwt.verify(token, process.env.JWT_SECRET);

  const { searchParams } = new URL(req.url);
  const planId = searchParams.get("plan");

  await dbConnect();

  const plan = await Plan.findById(planId);
  if (!plan) return Response.json({ error: "Plan not found" }, { status: 404 });

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + plan.durationDays);

  await Subscription.findOneAndUpdate(
    { userId: user.id },
    {
      userId: user.id,
      planName: plan.name,
      expiresAt,
    },
    { upsert: true }
  );

  return Response.json({ success: true });
}
