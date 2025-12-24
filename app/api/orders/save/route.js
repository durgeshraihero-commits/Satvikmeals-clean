import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";
import Cart from "@/models/Cart";

export async function POST(req) {
  try {
    await dbConnect();

    const { paymentId, paymentStatus, email } = await req.json();

    if (!paymentId || !paymentStatus || !email) {
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

    const total = cart.items.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );

    const order = await Order.create({
      userEmail: email,
      items: cart.items,
      totalAmount: total,
      paymentId,
      paymentStatus,
      paymentMethod: "online"
    });

    // clear cart
    cart.items = [];
    await cart.save();

    return Response.json({ success: true, order });
  } catch (err) {
    console.error("Order save error:", err);
    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
