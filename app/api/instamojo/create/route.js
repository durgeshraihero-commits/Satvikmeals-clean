import { NextResponse } from "next/server";
import { getUserFromToken } from "@/lib/auth";
import { PLANS } from "@/lib/plans";

export async function POST(req) {
  const user = getUserFromToken();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { planId } = await req.json();
  const plan = PLANS[planId];

  if (!plan) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  // ✅ IMPORTANT: x-www-form-urlencoded
  const body = new URLSearchParams({
    purpose: plan.name,
    amount: plan.price.toString(),
    buyer_name: user.name || "Satvik User",
    email: user.email,
    redirect_url: `${process.env.BASE_URL}/api/payment/success`,
    send_email: "false",
    send_sms: "false",
    allow_repeated_payments: "false",
  });

  const response = await fetch(
    "https://www.instamojo.com/api/1.1/payment-requests/",
    {
      method: "POST",
      headers: {
        "X-Api-Key": process.env.INSTAMOJO_API_KEY,
        "X-Auth-Token": process.env.INSTAMOJO_AUTH_TOKEN,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    }
  );

  const data = await response.json();

  console.log("INSTAMOJO RESPONSE:", data);

  if (!data.success) {
    return NextResponse.json(
      { error: "Instamojo error", data },
      { status: 500 }
    );
  }

  return NextResponse.json({
    url: data.payment_request.longurl,
  });
}
