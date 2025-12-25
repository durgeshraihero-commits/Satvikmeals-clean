import axios from "axios";
import qs from "qs";
import { NextResponse } from "next/server";
import { PLANS } from "@/lib/plans";

export async function POST(req) {
  try {
    const { planId } = await req.json();
    const plan = PLANS[planId];

    if (!plan) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const payload = qs.stringify({
      purpose: plan.name,
      amount: plan.price,
      buyer_name: "SatvikMeals User",
      email: "customer@test.com",
      phone: "9999999999",
      redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
      allow_repeated_payments: false,
      send_email: false,
      send_sms: false,
    });

    const response = await axios.post(
      `${process.env.INSTAMOJO_BASE_URL}/payment-requests/`,
      payload,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Api-Key": process.env.INSTAMOJO_API_KEY,
          "X-Auth-Token": process.env.INSTAMOJO_AUTH_TOKEN,
        },
      }
    );

    if (!response.data.success) {
      console.error("Instamojo failed:", response.data);
      return NextResponse.json({ error: "Instamojo rejected request" }, { status: 500 });
    }

    return NextResponse.json({
      url: response.data.payment_request.longurl,
    });

  } catch (err) {
    console.error("Instamojo error:", err.response?.data || err.message);
    return NextResponse.json({ error: "Payment failed" }, { status: 500 });
  }
}
