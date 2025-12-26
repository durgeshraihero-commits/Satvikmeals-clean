import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    await dbConnect();

    const { planId } = await req.json();

    // ✅ fetch logged-in user (email stored in token/session)
    const user = await User.findOne({ email: req.headers.get("x-user-email") });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    if (!user.phone || user.phone.length !== 10) {
      return Response.json(
        { error: "Invalid phone number in profile" },
        { status: 400 }
      );
    }

    const planMap = {
      tea: { name: "Tea Plan", amount: 9 },
      meal: { name: "Meal", amount: 59 },
      month1: { name: "1 Month Meal", amount: 3099 },
      month2: { name: "2 Month Meal", amount: 5999 },
    };

    const plan = planMap[planId];
    if (!plan) {
      return Response.json({ error: "Invalid plan" }, { status: 400 });
    }

    const response = await fetch(
      `${process.env.INSTAMOJO_BASE_URL}/payment-requests/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Api-Key": process.env.INSTAMOJO_API_KEY,
          "X-Auth-Token": process.env.INSTAMOJO_AUTH_TOKEN,
        },
        body: new URLSearchParams({
          amount: plan.amount.toString(),
          purpose: plan.name,
          buyer_name: user.name || "Satvik User",
          email: user.email,
          phone: user.phone, // ✅ REAL USER PHONE
          redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/success`,
        }),
      }
    );

    const data = await response.json();

    if (!data.success) {
      console.error("Instamojo Error:", data);
      return Response.json({ error: data.message }, { status: 500 });
    }

    return Response.json({
      url: data.payment_request.longurl, // ✅ REDIRECT URL
    });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Payment failed" }, { status: 500 });
  }
}
