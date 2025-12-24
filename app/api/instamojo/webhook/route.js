import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";

export async function POST(req) {
  await dbConnect();
  const body = await req.formData();

  const orderId = body.get("purpose")?.split("#")[1];
  const status = body.get("status");

  if (!orderId) return Response.json({});

  await Order.findByIdAndUpdate(orderId, {
    paymentStatus: status === "Credit" ? "PAID" : "FAILED",
  });

  return Response.json({ success: true });
}
