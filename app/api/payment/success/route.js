import dbConnect from "@/lib/mongodb";
import Subscription from "@/models/Subscription";
import Cart from "@/models/Cart";
import { PLANS } from "@/lib/plans";
import { getUserFromToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req) {
  await dbConnect();

  // 🔐 Logged-in user from cookie
  const user = getUserFromToken();
  if (!user) {
    return Response.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/login`
    );
  }

  const { searchParams } = new URL(req.url);
  const planKey = searchParams.get("plan"); // only for subscription payments

  /* ===============================
     1️⃣ HANDLE SUBSCRIPTION PAYMENT
     =============================== */
  if (planKey) {
    const plan = PLANS[planKey];
    if (!plan) {
      return Response.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/subscribe`
      );
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + plan.durationDays);

    await Subscription.findOneAndUpdate(
      { email: user.email },
      {
        email: user.email,
        plan: plan.name,
        expiresAt,
      },
      { upsert: true }
    );
  }

  /* ===============================
     2️⃣ CLEAR CART AFTER SUCCESS
     =============================== */
  await Cart.deleteOne({ userEmail: user.email });

  /* ===============================
     3️⃣ REDIRECT USER
     =============================== */
  return Response.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`
  );
}
