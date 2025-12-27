import dbConnect from "@/lib/mongodb";
import Plan from "@/models/Plan";
import User from "@/models/User";
import Subscription from "@/models/Subscription";
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

    const user = await User.findById(decoded.userId);
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const plan = await Plan.findById(planId);
    if (!plan) {
      return Response.json({ error: "Plan not found" }, { status: 404 });
    }

    // 🔥 CALCULATE EXPIRY
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + plan.durationDays);

    // 🔥 REMOVE OLD SUBSCRIPTION (optional but clean)
    await Subscription.deleteMany({ user: user._id });

    // 🔥 SAVE SUBSCRIPTION
    await Subscription.create({
      user: user._id,
      plan: plan._id,
      expiresAt,
    });

    return Response.json({
      success: true,
    });
  } catch (err) {
    console.error("SUBSCRIPTION ERROR:", err);
    return Response.json({ error: "Subscription failed" }, { status: 500 });
  }
}
