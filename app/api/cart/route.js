import dbConnect from "../../../lib/mongodb";
import Cart from "../../../models/Cart";

/**
 * GET CART
 * /api/cart?email=user@email.com
 */
export async function GET(req) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return Response.json({ error: "Email required" }, { status: 400 });
  }

  let cart = await Cart.findOne({ userEmail: email });

  if (!cart) {
    cart = await Cart.create({
      userEmail: email,
      items: []
    });
  }

  return Response.json(cart);
}

/**
 * ADD ITEM TO CART
 */
export async function POST(req) {
  await dbConnect();

  const { email, itemId, name, price, image } = await req.json();

  if (!email || !itemId) {
    return Response.json({ error: "Missing data" }, { status: 400 });
  }

  let cart = await Cart.findOne({ userEmail: email });

  if (!cart) {
    cart = await Cart.create({
      userEmail: email,
      items: []
    });
  }

  // ❌ block base64 images
  const safeImage =
    image && image.startsWith("data:") ? null : image;

  const index = cart.items.findIndex(i => i.itemId === itemId);

  if (index > -1) {
    cart.items[index].quantity += 1;
  } else {
    cart.items.push({
      itemId,
      name,
      price,
      image: safeImage,
      quantity: 1
    });
  }

  await cart.save();
  return Response.json(cart);
}

/**
 * UPDATE QUANTITY
 */
export async function PATCH(req) {
  await dbConnect();

  const { email, itemId, action } = await req.json();

  if (!email || !itemId) {
    return Response.json({ error: "Missing data" }, { status: 400 });
  }

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
