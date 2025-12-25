import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";
import Cart from "@/models/Cart";

export async function POST(req) {
  await dbConnect();

  const { paymentId, paymentStatus, email, amount } = await req.json();

  if (!paymentId || !paymentStatus || !email || !amount) {
    return Response.json(
      { error: "Missing payment info" },
      { status: 400 }
    );
  }

  const cart = await Cart.findOne({ userEmail: email });

  if (!cart || cart.items.length === 0) {
    return Response.json(
      { error: "Cart empty" },
      { status: 400 }
    );
  }

  const order = await Order.create({
    userEmail: email,
    items: cart.items,
    totalAmount: amount,
    paymentId,
    paymentStatus,
    paymentMethod: "online",
  });

  // ✅ clear cart AFTER order saved
  cart.items = [];
  await cart.save();

  return Response.json({ success: true, order });
}
