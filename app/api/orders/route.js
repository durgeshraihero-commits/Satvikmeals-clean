import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET(req) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return Response.json([]);
  }

  const orders = await Order.find({ userEmail: email }).sort({
    createdAt: -1,
  });

  return Response.json(orders);
}
