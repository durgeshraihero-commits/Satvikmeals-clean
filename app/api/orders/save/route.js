import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";
import Payment from "@/models/Payment";
import Cart from "@/models/Cart";

export async function POST(req) {
  try {
    await dbConnect();

    const { paymentId, paymentStatus, email, amount } = await req.json();

    if (!paymentId || !email || !amount) {
      return Response.json(
        { error: "Missing payment info" },
        { status: 400 }
      );
    }

    // Get user's cart
    const cart = await Cart.findOne({ userEmail: email });

    if (!cart || cart.items.length === 0) {
      return Response.json(
        { error: "Cart empty" },
        { status: 400 }
      );
    }

    // 1️⃣ SAVE ORDER
    const order = await Order.create({
      userEmail: email,
      items: cart.items,
      totalAmount: amount,
      paymentId,
      paymentStatus: paymentStatus || "Credit",
      paymentMethod: "online"
    });

    // 2️⃣ SAVE PAYMENT
    await Payment.create({
      userEmail: email,
      paymentId,
      amount,
      status: paymentStatus || "Credit",
      method: "online"
    });

    // 3️⃣ CLEAR CART
    cart.items = [];
    await cart.save();

    return Response.json({
      success: true,
      order
    });

  } catch (err) {
    console.error("Order save error:", err);
    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
