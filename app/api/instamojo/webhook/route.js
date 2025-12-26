import dbConnect from "@/lib/mongodb";
import Payment from "@/models/Payment";
import Subscription from "@/models/Subscription";
import Plan from "@/models/Plan";

export async function POST(req) {
  await dbConnect();
  const data = await req.formData();

  const requestId = data.get("payment_request_id");
  const paymentId = data.get("payment_id");
  const status = data.get("status");

  const payment = await Payment.findOne({ requestId });
  if (!payment) return Response.json({});

  payment.status = status;
  payment.paymentId = paymentId;
  await payment.save();

  if (status === "Credit" && payment.source === "subscription") {
    const plan = await Plan.findOne({ name: payment.purpose });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + plan.durationDays);

    await Subscription.findOneAndUpdate(
      { email: payment.email },
      {
        email: payment.email,
        planId: plan._id,
        expiresAt,
        active: true,
      },
      { upsert: true }
    );
  }

  return Response.json({ success: true });
}
