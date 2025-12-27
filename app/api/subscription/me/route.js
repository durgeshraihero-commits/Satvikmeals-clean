import dbConnect from "@/lib/mongodb";
import Subscription from "@/models/Subscription";
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

    const sub = await Subscription.findOne({
      user: decoded.userId,
      expiresAt: { $gt: new Date() },
    }).populate("plan");

    return Response.json({ subscription: sub });
  } catch (err) {
    console.error(err);
    return Response.json({ subscription: null });
  }
}
