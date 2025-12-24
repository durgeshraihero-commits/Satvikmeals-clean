export const dynamic = "force-dynamic";

import dbConnect from "@/lib/mongodb";
import Cart from "@/models/Cart";
import Order from "@/models/Order";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST() {
  await dbConnect();

  // 🔐 get user from token
  const token = cookies().get("token")?.value;
  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const email = decoded.email;

  // 🛒 get cart
  const cart = await Cart.findOne({ userEmail: email });
  if (!cart || cart.items.length === 0) {
    return Response.json({ error: "Cart empty" }, { status: 400 });
  }

  const total = cart.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  // 📦 save order
  await Order.create({
    userEmail: email,
    items: cart.items,
    totalAmount: total,
  });

  // 🧹 clear cart
  cart.items = [];
  await cart.save();

  return Response.json({ success: true });
}
