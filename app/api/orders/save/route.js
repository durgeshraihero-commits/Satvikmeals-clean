import dbConnect from "@/lib/mongodb";
import Cart from "@/models/Cart";
import Order from "@/models/Order";
import Payment from "@/models/Payment";
import { getUserFromToken } from "@/lib/auth";

export async function POST(req) {
  await dbConnect();

  const user = getUserFromToken();
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { paymentId, paymentRequestId } = await req.json();

  const cart = await Cart.findOne({ userEmail: user.email });
  if (!cart || cart.items.length === 0) {
    return Response.json({ error: "Cart empty" }, { status: 400 });
  }

  const totalAmount = cart.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  // ✅ SAVE ORDER
  const order = await Order.create({
    userEmail: user.email,
    items: cart.items,
    totalAmount,
    paymentMethod: "online",
    status: "paid"
  });

  // ✅ SAVE PAYMENT
  await Payment.create({
    userEmail: user.email,
    orderId: order._id,
    amount: totalAmount,
    provider: "Instamojo",
    paymentId,
    paymentRequestId,
    status: "success"
  });

  // ✅ CLEAR CART
  cart.items = [];
  await cart.save();

  return Response.json({ success: true });
}
