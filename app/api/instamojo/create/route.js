import { NextResponse } from "next/server";
import axios from "axios";
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

  const res = await axios.post(
    "https://www.instamojo.com/api/1.1/payment-requests/",
    {
      purpose: plan.name,
      amount: plan.price,
      buyer_name: user.name || user.email,
      email: user.email,
      redirect_url: `${process.env.BASE_URL}/api/payment/success`,
    },
    {
      headers: {
        "X-Api-Key": process.env.INSTAMOJO_API_KEY,
        "X-Auth-Token": process.env.INSTAMOJO_AUTH_TOKEN,
      },
    }
  );

  // ✅ THIS WAS THE BUG
  const longurl = res.data?.payment_request?.longurl;

  if (!longurl) {
    return NextResponse.json(
      { error: "Instamojo URL not received" },
      { status: 500 }
    );
  }

  return NextResponse.json({ url: longurl });
}
