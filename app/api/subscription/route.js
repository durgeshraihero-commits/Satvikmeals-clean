import dbConnect from "@/lib/mongodb";
import Subscription from "@/models/Subscription";
import { getUserFromToken } from "@/lib/auth";

export async function GET() {
  await dbConnect();
  const user = getUserFromToken();

  if (!user) return Response.json({ active: false });

  const sub = await Subscription.findOne({ email: user.email });
  return Response.json(sub || { active: false });
}
