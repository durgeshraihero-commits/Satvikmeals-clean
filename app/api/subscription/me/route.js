import dbConnect from "@/lib/mongodb";
import Subscription from "@/models/Subscription";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    const token = cookies().get("token")?.value;
    if (!token) return Response.json({ subscription: null });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    await dbConnect();

    const subscription = await Subscription.findOne({
      user: userId,
      expiresAt: { $gt: new Date() },
    }).populate("plan");

    return Response.json({ subscription });
  } catch {
    return Response.json({ subscription: null });
  }
}
