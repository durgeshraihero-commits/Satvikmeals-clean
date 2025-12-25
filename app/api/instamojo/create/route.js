import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  await dbConnect();

  const { email, amount } = await req.json();
  if (!email || amount < 9) {
    return Response.json({ error: "Invalid payment" }, { status: 400 });
  }

  const user = await User.findOne({ email });
  if (!user?.phone) {
    return Response.json({ error: "Phone missing" }, { status: 400 });
  }

  const res = await fetch(
    `${process.env.INSTAMOJO_BASE_URL}/payment-requests/`,
    {
      method: "POST",
      headers: {
        "X-Api-Key": process.env.INSTAMOJO_API_KEY,
        "X-Auth-Token": process.env.INSTAMOJO_AUTH_TOKEN,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        amount: amount.toString(),
        purpose: "SatvikMeals Order",
        buyer_name: user.name || "Customer",
        email: user.email,
        phone: user.phone,
        redirect_url: `${process.env.BASE_URL}/payment/success?email=${user.email}`
      })
    }
  );

  const data = await res.json();

  return Response.json({
    paymentUrl: data.payment_request.longurl
  });
}
