import dbConnect from "@/lib/mongodb";
import Cart from "@/models/Cart";
import Order from "@/models/Order";
import Payment from "@/models/Payment";

export async function POST(req) {
  await dbConnect();

  const { email, paymentId, paymentStatus, amount } = await req.json();

  if (!email || !paymentId || !amount) {
    return Response.json({ error: "Missing payment info" }, { status: 400 });
  }

  const cart = await Cart.findOne({ userEmail: email });

  if (!cart || cart.items.length === 0) {
    return Response.json({ error: "Cart empty" }, { status: 400 });
  }

  // ✅ SAVE PAYMENT
  await Payment.create({
    userEmail: email,
    paymentId,
    amount,
    status: paymentStatus || "Credit",
    method: "online"
  });

  // ✅ SAVE ORDER
  const order = await Order.create({
    userEmail: email,
    items: cart.items,
    totalAmount: amount,
    paymentId,
    paymentStatus: paymentStatus || "Credit",
    paymentMethod: "online"
  });

  // ✅ CLEAR CART
  cart.items = [];
  await cart.save();

  return Response.json({
    success: true,
    order
  });
}
