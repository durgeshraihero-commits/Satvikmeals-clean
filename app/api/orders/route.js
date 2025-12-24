import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  await dbConnect();

  const token = cookies().get("token")?.value;
  if (!token) {
    return Response.json([], { status: 401 });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const email = decoded.email;

  const orders = await Order.find({ userEmail: email })
    .sort({ createdAt: -1 });

  return Response.json(orders);
}
