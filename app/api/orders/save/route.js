import dbConnect from "@/lib/mongodb";
import Cart from "@/models/Cart";
import Order from "@/models/Order";
import Payment from "@/models/Payment";

export async function POST(req) {
  await dbConnect();

  const { paymentId, paymentStatus, email } = await req.json();

  if (!paymentId || !email) {
    return Response.json({ error: "Missing payment info" }, { status: 400 });
  }

  const cart = await Cart.findOne({ userEmail: email });

  if (!cart || cart.items.length === 0) {
    return Response.json({ error: "Cart empty" }, { status: 400 });
  }

  const totalAmount = cart.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  // ✅ Save Order
  const order = await Order.create({
    userEmail: email,
    items: cart.items,
    totalAmount,
    paymentId,
    paymentStatus
  });

  // ✅ Save Payment
  await Payment.create({
    userEmail: email,
    paymentId,
    amount: totalAmount,
    status: paymentStatus,
    method: "online"
  });

  // ✅ Clear cart
  cart.items = [];
  await cart.save();

  return Response.json({ success: true, order });
}
