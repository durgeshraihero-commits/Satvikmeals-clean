import dbConnect from "@/lib/mongodb";
import Subscription from "@/models/Subscription";
import Plan from "@/models/Plan";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { planId } = await req.json();

    const token = cookies().get("token")?.value;
    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId; // ✅ MUST BE userId

    await dbConnect();

    const plan = await Plan.findById(planId);
    if (!plan) {
      return Response.json({ error: "Plan not found" }, { status: 404 });
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + plan.durationDays);

    await Subscription.findOneAndUpdate(
      { user: userId },
      { user: userId, plan: plan._id, expiresAt },
      { upsert: true }
    );

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Activation failed" }, { status: 500 });
  }
}
