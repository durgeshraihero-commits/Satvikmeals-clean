import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET(req) {
  await dbConnect();
  const email = new URL(req.url).searchParams.get("email");
  return Response.json(await Order.find({ userEmail: email }));
}
