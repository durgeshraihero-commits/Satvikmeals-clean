import dbConnect from "@/lib/mongodb";
import Cart from "@/models/Cart";
import { getUserFromToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  await dbConnect();
  const user = getUserFromToken();
  if (!user) return Response.json({ items: [] });

  let cart = await Cart.findOne({ userId: user.userId });
  if (!cart) cart = await Cart.create({ userId: user.userId, items: [] });

  return Response.json(cart);
}

export async function PATCH(req) {
  await dbConnect();
  const user = getUserFromToken();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { itemId, action } = await req.json();
  const cart = await Cart.findOne({ userId: user.userId });

  const item = cart.items.find(i => i.itemId === itemId);
  if (!item) return Response.json(cart);

  if (action === "inc") item.quantity += 1;
  if (action === "dec") item.quantity -= 1;

  cart.items = cart.items.filter(i => i.quantity > 0);
  await cart.save();

  return Response.json(cart);
}
