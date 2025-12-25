import dbConnect from "@/lib/mongodb";
import Cart from "@/models/Cart";
import Order from "@/models/Order";
import Payment from "@/models/Payment";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await dbConnect();

    const { paymentId, paymentStatus } = await req.json();

    if (!paymentId || paymentStatus !== "Credit") {
      return Response.json(
        { error: "Invalid payment" },
        { status: 400 }
      );
    }

    // 🔐 get logged-in user
    const token = cookies().get("token")?.value;
    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userEmail = decoded.email;

    // 🛒 load cart
    const cart = await Cart.findOne({ userEmail });

    if (!cart || cart.items.length === 0) {
      return Response.json({ error: "Cart empty" }, { status: 400 });
    }

    const totalAmount = cart.items.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );

    // 📦 save order
    const order = await Order.create({
      userEmail,
      items: cart.items,
      totalAmount,
      paymentMethod: "online",
      status: "paid"
    });

    // 💳 save payment
    await Payment.create({
      userEmail,
      orderId: order._id,
      paymentId,
      amount: totalAmount,
      status: "Credit",
      method: "Instamojo"
    });

    // 🧹 clear cart
    cart.items = [];
    await cart.save();

    return Response.json({ success: true });

  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
