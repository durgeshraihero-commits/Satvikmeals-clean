import dbConnect from "@/lib/mongodb";
import Subscription from "@/models/Subscription";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();

    const token = cookies().get("token")?.value;
    if (!token) {
      return Response.json({ subscription: null });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ IMPORTANT: use decoded.userId (confirmed by your DB)
    const userId = decoded.userId;

    const subscription = await Subscription.findOne({
      user: userId,
      status: "active",
      expiresAt: { $gt: new Date() },
    }).populate("plan");

    return Response.json({
      subscription: subscription || null,
    });
  } catch (err) {
    console.error("SUBSCRIPTION ME ERROR:", err);
    return Response.json({ subscription: null });
  }
}
