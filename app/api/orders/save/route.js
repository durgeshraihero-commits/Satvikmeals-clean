import dbConnect from "@/lib/mongodb";
import Cart from "@/models/Cart";
import Order from "@/models/Order";

export async function POST(req) {
  try {
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
      return Response.json({ error: "Cart empty" }, { status: 400 });
    }

    // ✅ Create order
    const order = await Order.create({
      userEmail: email,
      items: cart.items,
      totalAmount: amount,
      paymentId,
      paymentStatus,
      paymentMethod: "online"
    });

    // ✅ Clear cart after order
    cart.items = [];
    await cart.save();

    return Response.json({ success: true, order });

  } catch (err) {
    console.error(err);
    return Response.json({ error: "Order save failed" }, { status: 500 });
  }
}
