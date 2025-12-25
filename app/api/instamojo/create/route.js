import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    await dbConnect();

    const { email, amount } = await req.json();

    if (!email || !amount) {
      return Response.json(
        { error: "Missing email or amount" },
        { status: 400 }
      );
    }

    if (Number(amount) < 9) {
      return Response.json(
        { error: "Minimum amount is ₹9" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user || !user.phone) {
      return Response.json(
        { error: "User phone number missing" },
        { status: 400 }
      );
    }

    const res = await fetch(
      `${process.env.INSTAMOJO_BASE_URL}/payment-requests/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Api-Key": process.env.INSTAMOJO_API_KEY,
          "X-Auth-Token": process.env.INSTAMOJO_AUTH_TOKEN
        },
        body: new URLSearchParams({
          amount: amount.toString(),
          purpose: "SatvikMeals Order",
          buyer_name: user.name || "Customer",
          email: user.email,
          phone: user.phone,
          redirect_url:
            "https://satvikmeals-lwg3.onrender.com/payment/success",
          webhook:
            "https://satvikmeals-lwg3.onrender.com/api/instamojo/webhook",
          send_email: "true",
          send_sms: "true",
          allow_repeated_payments: "false"
        })
      }
    );

    const data = await res.json();

    // ✅ IMPORTANT SAFETY CHECK
    if (!data.success || !data.payment_request?.longurl) {
      console.error("Instamojo error response:", data);
      return Response.json(
        { error: "Instamojo payment creation failed" },
        { status: 500 }
      );
    }

    return Response.json({
      paymentUrl: data.payment_request.longurl
    });

  } catch (err) {
    console.error("Instamojo exception:", err);
    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
