import dbConnect from "@/lib/mongodb";
import Subscription from "@/models/Subscription";
import { getUserFromToken } from "@/lib/auth";

export async function GET() {
  await dbConnect();
  const user = getUserFromToken();

  if (!user) {
    return Response.json({ subscription: null });
  }

  const sub = await Subscription.findOne({ email: user.email });

  // ❌ No subscription
  if (!sub || !sub.expiresAt) {
    return Response.json({ subscription: null });
  }

  const now = new Date();
  const expiry = new Date(sub.expiresAt);

  // ❌ Invalid or expired
  if (isNaN(expiry.getTime()) || expiry < now) {
    return Response.json({ subscription: null });
  }

  // ✅ Valid subscription
  return Response.json({
    subscription: {
      plan: sub.plan,
      expiresAt: expiry.toISOString(),
    },
  });
}
