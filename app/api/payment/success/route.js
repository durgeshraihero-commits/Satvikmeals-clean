import dbConnect from "@/lib/mongodb";
import Subscription from "@/models/Subscription";
import { PLANS } from "@/lib/plans";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(req) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const planId = searchParams.get("plan");
  const plan = PLANS[planId];

  if (!plan) {
    return Response.redirect("/");
  }

  const token = cookies().get("token")?.value;
  const user = jwt.verify(token, process.env.JWT_SECRET);

  const start = new Date();
  const end = new Date();
  end.setDate(end.getDate() + plan.durationDays);

  await Subscription.create({
    email: user.email,
    plan: plan.name,
    startDate: start,
    endDate: end,
    active: true,
  });

  return Response.redirect(
    `${process.env.NEXT_PUBLIC_URL}/dashboard/subscription`
  );
}
