import dbConnect from "@/lib/mongodb";
import Subscription from "@/models/Subscription";
import { PLANS } from "@/lib/plans";

export async function GET(req) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const planKey = searchParams.get("plan");

  const plan = PLANS[planKey];
  if (!plan) return Response.redirect("/subscribe");

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + plan.durationDays);

  await Subscription.findOneAndUpdate(
    { email },
    {
      email,
      plan: plan.name,
      expiresAt,
    },
    { upsert: true }
  );

  return Response.redirect("/dashboard/subscription");
}
