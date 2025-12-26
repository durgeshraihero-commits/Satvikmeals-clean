import dbConnect from "@/lib/mongodb";
import Plan from "@/models/Plan";
import User from "@/models/User";
import axios from "axios";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    // 1️⃣ Read body
    const { planId } = await req.json();
    if (!planId) {
      return Response.json({ error: "Plan ID missing" }, { status: 400 });
    }

    // 2️⃣ Auth
    const token = cookies().get("token")?.value;
    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("JWT DECODED:", decoded);

    // 3️⃣ DB
    await dbConnect();

    // 🔴 FIX IS HERE
    const user = await User.findById(decoded.userId);
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    // 🔴 VALIDATE PHONE
    if (!user.phone || !/^[6-9]\d{9}$/.test(user.phone)) {
      return Response.json(
        { error: "Please update your phone number before payment" },
        { status: 400 }
      );
    }

    const plan = await Plan.findById(planId);
    if (!plan) {
      return Response.json({ error: "Plan not found" }, { status: 404 });
    }

    // 4️⃣ Instamojo request
    const payload = {
      purpose: `SatvikMeals Subscription - ${plan.name}`,
      amount: plan.price.toString(),
      buyer_name: user.name || "SatvikMeals User",
      email: user.email,
      phone: user.phone, // ✅ REAL USER PHONE
      redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?type=subscription&plan=${plan._id}`,
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

    return Response.json({
      url: response.data.payment_request.longurl,
    });

  } catch (err) {
    console.error(
      "INSTAMOJO SUBSCRIPTION ERROR:",
      err?.response?.data || err
    );
    return Response.json(
      { error: "Payment failed" },
      { status: 500 }
    );
  }
}
