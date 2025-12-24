import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import Cart from "@/models/Cart";

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

    const user = await User.findOne({ email });
    if (!user || !user.phone) {
      return Response.json(
        { error: "User phone number not found" },
        { status: 400 }
      );
    }

    const response = await fetch(
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
          redirect_url: "https://satvikmeals.onrender.com/payment/success",
          webhook: "https://satvikmeals.onrender.com/api/instamojo/webhook",
          send_email: "true",
          send_sms: "true",
          allow_repeated_payments: "false"
        })
      }
    );

    const data = await response.json();

    if (!data.success) {
      console.error("Instamojo API Error:", data);
      return Response.json(
        { error: data.message || "Instamojo failed" },
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
