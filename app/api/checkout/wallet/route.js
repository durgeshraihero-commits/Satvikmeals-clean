import dbConnect from "../../../../lib/mongodb";
import Cart from "../../../../models/Cart";
import User from "../../../../models/User";
import Order from "../../../../models/Order";

export async function POST(req) {
  try {
    await dbConnect();

    const { email } = await req.json();

    if (!email) {
      return Response.json(
        { error: "Email required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return Response.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const cart = await Cart.findOne();
    if (!cart || cart.items.length === 0) {
      return Response.json(
        { error: "Cart is empty" },
        { status: 400 }
      );
    }

    const total = cart.items.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0
    );

    if (user.walletBalance < total) {
      return Response.json(
        { error: "Insufficient wallet balance" },
        { status: 400 }
      );
    }

    // ✅ Deduct wallet balance
    user.walletBalance -= total;
    await user.save();

    // ✅ Create order
    await Order.create({
      userEmail: email,
      items: cart.items,
      totalAmount: total,
      paymentMethod: "wallet",
      status: "paid"
    });

    // ✅ Clear cart
    cart.items = [];
    await cart.save();

    return Response.json({ success: true });

  } catch (err) {
    console.error("Wallet checkout error:", err);
    return Response.json(
      { error: "Wallet payment failed" },
      { status: 500 }
    );
  }
}
