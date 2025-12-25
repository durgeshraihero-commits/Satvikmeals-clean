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
      amount: plan.price,
      buyer_name: "SatvikMeals User",
      email: "test@example.com", // Instamojo requires email
      phone: "9999999999",        // Instamojo requires phone
      redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
      send_email: false,
      send_sms: false,
      allow_repeated_payments: false,
    };

    const response = await axios.post(
      "https://www.instamojo.com/api/1.1/payment-requests/",
      payload,
      {
        headers: {
          "X-Api-Key": process.env.INSTAMOJO_API_KEY,
          "X-Auth-Token": process.env.INSTAMOJO_AUTH_TOKEN,
        },
      }
    );

    const longurl = response.data?.payment_request?.longurl;

    if (!longurl) {
      console.error("Instamojo response:", response.data);
      return NextResponse.json({ error: "Instamojo failed" }, { status: 500 });
    }

    return NextResponse.json({ url: longurl });

  } catch (err) {
    console.error("Instamojo error:", err.response?.data || err.message);
    return NextResponse.json({ error: "Payment failed" }, { status: 500 });
  }
}
