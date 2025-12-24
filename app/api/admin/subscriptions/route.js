import dbConnect from "../../../../lib/mongodb";
import Subscription from "../../../../models/Subscription";
import { requireAdmin } from "../../../../lib/isAdmin";

export async function GET() {
  requireAdmin();
  await dbConnect();
  return Response.json(await Subscription.find().populate("userId"));
}

export async function PATCH(req) {
  requireAdmin();
  await dbConnect();

  const { id, validTill } = await req.json();

  await Subscription.findByIdAndUpdate(id, { validTill });
  return Response.json({ success: true });
}
