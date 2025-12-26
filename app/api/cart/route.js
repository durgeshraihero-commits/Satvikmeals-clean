import dbConnect from "@/lib/mongodb";
import Cart from "@/models/Cart";
import { getUserFromToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  await dbConnect();
  const user = getUserFromToken();

  if (!user) {
    return Response.json({ items: [] });
  }

  const cart = await Cart.findOne({ userEmail: user.email });
  return Response.json(cart || { items: [] });
}

export async function POST(req) {
  await dbConnect();
  const user = getUserFromToken();
  const body = await req.json();

  if (!user) {
    return Response.json({ error: "User not logged in" }, { status: 401 });
  }

  let cart = await Cart.findOne({ userEmail: user.email });
  if (!cart) {
    cart = await Cart.create({
      userEmail: user.email,
      items: [],
    });
  }

  const existing = cart.items.find(i => i.itemId === body.itemId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.items.push({
      itemId: body.itemId,
      name: body.name,
      price: body.price,
      image: body.image || "",
      quantity: 1,
    });
  }

  await cart.save();
  return Response.json(cart);
}

export async function PATCH(req) {
  await dbConnect();
  const user = getUserFromToken();
  const { itemId, action } = await req.json();

  if (!user) return Response.json({ items: [] });

  const cart = await Cart.findOne({ userEmail: user.email });
  if (!cart) return Response.json({ items: [] });

  const item = cart.items.find(i => i.itemId === itemId);
  if (!item) return Response.json(cart);

  if (action === "inc") item.quantity++;
  if (action === "dec") item.quantity--;

  if (item.quantity <= 0) {
    cart.items = cart.items.filter(i => i.itemId !== itemId);
  }

  await cart.save();
  return Response.json(cart);
}

export async function DELETE(req) {
  await dbConnect();
  const user = getUserFromToken();
  const { itemId } = await req.json();

  if (!user) return Response.json({ items: [] });

  const cart = await Cart.findOne({ userEmail: user.email });
  if (!cart) return Response.json({ items: [] });

  cart.items = cart.items.filter(i => i.itemId !== itemId);
  await cart.save();

  return Response.json(cart);
}
