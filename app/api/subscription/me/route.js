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

    // 🔥 IMPORTANT FIX:
    // Match by EMAIL (most stable, you ARE saving email)
    const subscription = await Subscription.findOne({
      email: decoded.email,
      expiresAt: { $gt: new Date() },
    }).sort({ createdAt: -1 });

    return Response.json({ subscription });
  } catch (err) {
    console.error("SUBSCRIPTION ME ERROR:", err);
    return Response.json({ subscription: null });
  }
}
