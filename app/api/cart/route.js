import dbConnect from "@/lib/mongodb";
import Cart from "@/models/Cart";

export async function GET() {
  await dbConnect();

  // TEMP user (later from auth)
  const userId = "694b5a86af82dc5a284fe5ba";

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({ userId, items: [] });
  }

  return Response.json(cart);
}

export async function POST(req) {
  await dbConnect();

  const userId = "694b5a86af82dc5a284fe5ba";
  const { itemId, name, price, image } = await req.json();

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({ userId, items: [] });
  }

  // ✅ CHECK IF ITEM ALREADY EXISTS
  const existingItem = cart.items.find(i => i.itemId === itemId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.items.push({
      itemId,
      name,
      price,
      image,
      quantity: 1
    });
  }

  await cart.save();

  return Response.json(cart);
}

export async function PATCH(req) {
  await dbConnect();

  const userId = "694b5a86af82dc5a284fe5ba";
  const { itemId, action } = await req.json();

  const cart = await Cart.findOne({ userId });
  if (!cart) return Response.json({ error: "Cart not found" });

  const item = cart.items.find(i => i.itemId === itemId);
  if (!item) return Response.json(cart);

  if (action === "inc") item.quantity += 1;
  if (action === "dec") item.quantity -= 1;

  cart.items = cart.items.filter(i => i.quantity > 0);
  await cart.save();

  return Response.json(cart);
}
