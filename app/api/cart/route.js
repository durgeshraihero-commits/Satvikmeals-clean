import dbConnect from "@/lib/mongodb";
import Cart from "@/models/Cart";
import { getUserFromToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

function getEmail() {
  const user = getUserFromToken();
  if (!user?.email) throw new Error("Unauthorized");
  return user.email;
}

export async function GET() {
  await dbConnect();
  const email = getEmail();

  let cart = await Cart.findOne({ userEmail: email });
  if (!cart) {
    cart = await Cart.create({ userEmail: email, items: [] });
  }

  return Response.json(cart);
}

export async function POST(req) {
  await dbConnect();
  const email = getEmail();
  const body = await req.json();

  let cart = await Cart.findOne({ userEmail: email });
  if (!cart) {
    cart = await Cart.create({ userEmail: email, items: [] });
  }

  const index = cart.items.findIndex(i => i.itemId === body.itemId);

  if (index > -1) {
    cart.items[index].quantity += 1;
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
  const email = getEmail();
  const { itemId, action } = await req.json();

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

export async function DELETE(req) {
  await dbConnect();
  const email = getEmail();
  const { itemId } = await req.json();

  const cart = await Cart.findOne({ userEmail: email });
  if (!cart) return Response.json({ items: [] });

  cart.items = cart.items.filter(i => i.itemId !== itemId);
  await cart.save();

  return Response.json(cart);
}
