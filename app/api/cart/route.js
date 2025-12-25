import dbConnect from "@/lib/mongodb";
import Cart from "@/models/Cart";

export async function GET(req) {
  await dbConnect();

  const email = req.nextUrl.searchParams.get("email");
  if (!email) return Response.json({ items: [] });

  let cart = await Cart.findOne({ userEmail: email });
  if (!cart) {
    cart = await Cart.create({ userEmail: email, items: [] });
  }

  return Response.json(cart);
}

export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  const { email, itemId, name, price, image } = body;

  let cart = await Cart.findOne({ userEmail: email });
  if (!cart) cart = await Cart.create({ userEmail: email, items: [] });

  const item = cart.items.find(i => i.itemId === itemId);
  if (item) item.quantity += 1;
  else cart.items.push({ itemId, name, price, image, quantity: 1 });

  await cart.save();
  return Response.json(cart);
}

export async function PATCH(req) {
  await dbConnect();
  const { email, itemId, action } = await req.json();

  const cart = await Cart.findOne({ userEmail: email });
  if (!cart) return Response.json({ items: [] });

  const item = cart.items.find(i => i.itemId === itemId);
  if (!item) return Response.json(cart);

  if (action === "inc") item.quantity += 1;
  if (action === "dec") item.quantity -= 1;

  cart.items = cart.items.filter(i => i.quantity > 0);
  await cart.save();

  return Response.json(cart);
}
