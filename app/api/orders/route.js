import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";
import { getUserEmail } from "@/lib/auth";

export async function GET() {
  await dbConnect();

  const email = getUserEmail();
  if (!email) {
    return Response.json([], { status: 401 });
  }

  const orders = await Order.find({ userEmail: email }).sort({ createdAt: -1 });

  return Response.json(orders);
}
