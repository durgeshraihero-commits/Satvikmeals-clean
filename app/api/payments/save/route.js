import dbConnect from "@/lib/mongodb";
import Payment from "@/models/Payment";

export async function POST(req) {
  await dbConnect();

  const { email, paymentId, amount, status } = await req.json();

  if (!email || !paymentId) {
    return Response.json({ error: "Missing payment info" }, { status: 400 });
  }

  const payment = await Payment.create({
    userEmail: email,
    paymentId,
    amount,
    status,
    method: "Instamojo",
  });

  return Response.json(payment);
}
