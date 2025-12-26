import dbConnect from "@/lib/mongodb";
import Subscription from "@/models/Subscription";
import Plan from "@/models/Plan";

export async function GET(req) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const planId = searchParams.get("plan");
  const email = searchParams.get("email");

  if (!planId || !email) {
    return Response.redirect("/subscribe");
  }

  const plan = await Plan.findById(planId);
  if (!plan) {
    return Response.redirect("/subscribe");
  }

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + plan.durationDays);

  await Subscription.findOneAndUpdate(
    { email },
    {
      email,
      planId: plan._id,
      planName: plan.name,
      expiresAt,
    },
    { upsert: true }
  );

  return Response.redirect("/dashboard/subscription");
}
