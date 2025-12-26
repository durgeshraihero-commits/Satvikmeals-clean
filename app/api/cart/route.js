import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongodb";
import Cart from "@/models/Cart";

export async function POST(req) {
  await dbConnect();

  const token = cookies().get("token")?.value;
  if (!token) {
    return Response.json({ error: "User not logged in" }, { status: 401 });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const body = await req.json();

  let cart = await Cart.findOne({ userEmail: decoded.email });
  if (!cart) {
    cart = await Cart.create({ userEmail: decoded.email, items: [] });
  }

  const existing = cart.items.find(i => i.itemId === body.itemId);
  if (existing) existing.quantity += 1;
  else cart.items.push({ ...body, quantity: 1 });

  await cart.save();
  return Response.json(cart);
}
