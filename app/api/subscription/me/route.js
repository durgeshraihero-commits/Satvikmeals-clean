import dbConnect from "@/lib/mongodb";
import Subscription from "@/models/Subscription";
import User from "@/models/User";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    const token = cookies().get("token")?.value;
    if (!token) {
      return Response.json({ subscription: null });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    await dbConnect();

    // 🔑 FIX: find user using EMAIL from JWT
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return Response.json({ subscription: null });
    }

    // 🔑 FIX: now query subscription using user._id
    const subscription = await Subscription.findOne({
      user: user._id,
      status: "active",
      expiresAt: { $gt: new Date() },
    }).populate("plan");

    return Response.json({ subscription });
  } catch (err) {
    console.error("SUBSCRIPTION FETCH ERROR:", err);
    return Response.json({ subscription: null });
  }
}
