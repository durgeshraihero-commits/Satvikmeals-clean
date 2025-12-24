import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET() {
  await dbConnect();

  // TEMP: last user (until auth is finalized)
  const orders = await Order.find().sort({ createdAt: -1 });

  return Response.json(orders);
}
