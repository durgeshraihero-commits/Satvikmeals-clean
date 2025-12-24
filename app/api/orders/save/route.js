import dbConnect from "../../../../lib/mongodb";
import Cart from "../../../../models/Cart";
import Order from "../../../../models/Order";

export async function POST() {
  await dbConnect();

  const cart = await Cart.findOne();
  if (!cart || cart.items.length === 0) {
    return Response.json({ error: "Cart empty" });
  }

  const total = cart.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  await Order.create({
    userEmail: "durgeshrai214@gmail.com", // TEMP
    items: cart.items,
    totalAmount: total,
    paymentMethod: "instamojo",
    paymentId: "INSTAMOJO_TXN"
  });

  cart.items = [];
  await cart.save();

  return Response.json({ success: true });
}
