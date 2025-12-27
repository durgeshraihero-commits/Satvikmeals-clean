import dbConnect from "@/lib/mongodb";
import Subscription from "@/models/Subscription";
import Plan from "@/models/Plan";
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

    // ✅ CORRECT FIELD
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    await dbConnect();

    const plan = await Plan.findById(planId);
    if (!plan) {
      return Response.json({ error: "Plan not found" }, { status: 404 });
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + plan.durationDays);

    await Subscription.findOneAndUpdate(
      { user: userId },
      {
        user: userId,
        plan: plan._id,
        expiresAt,
      },
      { upsert: true, new: true }
    );

    return Response.json({ success: true });
  } catch (err) {
    console.error("SUB ACTIVATE ERROR:", err);
    return Response.json({ error: "Activation failed" }, { status: 500 });
  }
}
