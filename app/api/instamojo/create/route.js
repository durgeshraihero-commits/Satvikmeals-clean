import axios from "axios";
import { PLANS } from "@/lib/plans";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { planId } = await req.json();
    const plan = PLANS[planId];

    if (!plan) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const payload = {
      purpose: plan.name,
      amount: plan.price.toString(),
      buyer_name: "SatvikMeals User",
      email: "customer@test.com",
      phone: "9999999999",
      redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
      allow_repeated_payments: false,
      send_email: false,
      send_sms: false,
    };

    console.log("📤 Instamojo payload:", payload);

    const response = await axios.post(
      "https://www.instamojo.com/api/1.1/payment-requests/",
      payload,
      {
        headers: {
          "X-Api-Key": process.env.INSTAMOJO_API_KEY,
          "X-Auth-Token": process.env.INSTAMOJO_AUTH_TOKEN,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("📥 Instamojo response:", response.data);

    if (!response.data.success) {
      return NextResponse.json(
        { error: response.data.message },
        { status: 500 }
      );
    }

    const longurl = response.data.payment_request.longurl;

    return NextResponse.json({ url: longurl });

  } catch (err) {
    console.error("❌ Instamojo ERROR:", err.response?.data || err.message);
    return NextResponse.json({ error: "Payment failed" }, { status: 500 });
  }
}
