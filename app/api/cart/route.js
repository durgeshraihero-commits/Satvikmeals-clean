import dbConnect from "../../../lib/mongodb";
import Cart from "../../../models/Cart";

const USER_EMAIL = "durgeshrai214@gmail.com"; // TEMP USER

export async function GET() {
  await dbConnect();

  let cart = await Cart.findOne({ userEmail: USER_EMAIL });

  if (!cart) {
    cart = await Cart.create({
      userEmail: USER_EMAIL,
      items: []
    });
  }

  return Response.json(cart);
}

export async function POST(req) {
  await dbConnect();
  const body = await req.json();

  let cart = await Cart.findOne({ userEmail: USER_EMAIL });

  if (!cart) {
    cart = await Cart.create({
      userEmail: USER_EMAIL,
      items: []
    });
  }

  const index = cart.items.findIndex(
    i => i.itemId === body.itemId
  );

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

export async function PATCH(req) {
  await dbConnect();
  const { itemId, action } = await req.json();

  const cart = await Cart.findOne({ userEmail: USER_EMAIL });
  if (!cart) return Response.json({ items: [] });

  const item = cart.items.find(i => i.itemId === itemId);
  if (!item) return Response.json(cart);

  if (action === "inc") item.quantity += 1;
  if (action === "dec") item.quantity -= 1;

  cart.items = cart.items.filter(i => i.quantity > 0);
  await cart.save();

  return Response.json(cart);
}
