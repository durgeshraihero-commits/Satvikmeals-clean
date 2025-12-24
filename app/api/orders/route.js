import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";
import { getUserFromToken } from "@/lib/auth";

export async function GET() {
  await dbConnect();

  const user = getUserFromToken();
  if (!user) return Response.json([]);

  const orders = await Order.find({ userEmail: user.email })
    .sort({ createdAt: -1 });

  return Response.json(orders);
}
