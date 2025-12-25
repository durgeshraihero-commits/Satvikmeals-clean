import dbConnect from "@/lib/mongodb";
import Cart from "@/models/Cart";

export async function GET(req) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

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

  let cart = await Cart.findOne({ userEmail: body.email });
  if (!cart) {
    cart = await Cart.create({ userEmail: body.email, items: [] });
  }

  const index = cart.items.findIndex(i => i.itemId === body.itemId);

  if (index > -1) {
    cart.items[index].quantity += 1;
  } else {
    cart.items.push({
      itemId: body.itemId,
      name: body.name,
      price: body.price,
      image: body.image,
      quantity: 1
    });
  }

  await cart.save();
  return Response.json(cart);
}
