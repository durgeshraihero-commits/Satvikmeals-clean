import dbConnect from "@/lib/mongodb";
import Cart from "@/models/Cart";
import Order from "@/models/Order";
import User from "@/models/User";

export async function POST(req) {
  try {
    await dbConnect();

    const { paymentId, paymentRequestId } = await req.json();

    if (!paymentId || !paymentRequestId) {
      return Response.json({ error: "Missing payment info" }, { status: 400 });
    }

    // TEMP: get last logged-in user (email stored in cart)
    const cart = await Cart.findOne().sort({ updatedAt: -1 });

    if (!cart || cart.items.length === 0) {
      return Response.json({ error: "Cart empty" }, { status: 400 });
    }

    const total = cart.items.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );

    const order = await Order.create({
      userEmail: cart.userEmail,
      items: cart.items,
      totalAmount: total,
      paymentMethod: "online",
      paymentId,
      paymentRequestId,
      status: "paid"
    });

    // Clear cart after order
    cart.items = [];
    await cart.save();

    return Response.json({ success: true, order });

  } catch (err) {
    console.error("Order save error:", err);
    return Response.json({ error: "Order save failed" }, { status: 500 });
  }
}
