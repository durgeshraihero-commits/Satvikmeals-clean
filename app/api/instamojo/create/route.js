import axios from "axios";
import qs from "qs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { planId } = await req.json();

    // ✅ PLAN DEFINITIONS
    const plans = {
      tea: { amount: 9, name: "Daily Tea" },
      meal: { amount: 59, name: "Single Meal" },
      month1: { amount: 3099, name: "1 Month Meal Plan" },
      month2: { amount: 5999, name: "2 Month Meal Plan" },
    };

    const plan = plans[planId];
    if (!plan) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    // ✅ FORM ENCODED DATA (VERY IMPORTANT)
    const payload = qs.stringify({
      purpose: plan.name,
      amount: plan.amount,
      buyer_name: "SatvikMeals User",
      email: "customer@example.com",
      phone: "9999999999",
      redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success`,
      send_email: false,
      send_sms: false,
      allow_repeated_payments: false,
    });

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

    // 🔥 THIS IS WHAT YOU WERE MISSING
    const paymentUrl = response.data?.payment_request?.longurl;

    if (!paymentUrl) {
      console.error("Instamojo response:", response.data);
      return NextResponse.json({ error: "Instamojo rejected request" }, { status: 500 });
    }

    return NextResponse.json({ url: paymentUrl });
  } catch (err) {
    console.error("Instamojo Error:", err?.response?.data || err.message);
    return NextResponse.json({ error: "Payment failed" }, { status: 500 });
  }
}
