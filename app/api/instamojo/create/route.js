import { PLANS } from "@/lib/plans";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const planId = searchParams.get("plan");

  const plan = PLANS[planId];
  if (!plan) {
    return Response.json({ error: "Invalid plan" }, { status: 400 });
  }

  const payload = {
    purpose: plan.name,
    amount: plan.price,
    buyer_name: "SatvikMeals User",
    redirect_url: `${process.env.NEXT_PUBLIC_URL}/api/payment/success?plan=${planId}`,
  };

  const res = await fetch("https://www.instamojo.com/api/1.1/payment-requests/", {
    method: "POST",
    headers: {
      "X-Api-Key": process.env.INSTAMOJO_API_KEY,
      "X-Auth-Token": process.env.INSTAMOJO_AUTH_TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  return Response.redirect(data.payment_request.longurl);
}
