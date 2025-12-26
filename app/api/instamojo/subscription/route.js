import dbConnect from "@/lib/mongodb";
import Plan from "@/models/Plan";
import Subscription from "@/models/Subscription";
import User from "@/models/User";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { DEV_MODE } from "@/lib/config";

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

    // 🧪 DEV MODE (NO PAYMENT, NO MONEY)
    if (DEV_MODE) {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + plan.durationDays);

      await Subscription.findOneAndUpdate(
        { email: user.email },
        {
          email: user.email,
          plan: plan.name,
          expiresAt,
        },
        { upsert: true }
      );

      return Response.json({
        success: true,
        message: "Subscription activated (DEV MODE)",
      });
    }

    return Response.json(
      { error: "Real payments disabled in DEV mode" },
      { status: 400 }
    );
  } catch (err) {
    console.error("SUBSCRIPTION ERROR:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
