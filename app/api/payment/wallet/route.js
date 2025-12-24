import dbConnect from "../../../../lib/mongodb";
import User from "../../../../models/User";
import Cart from "../../../../models/Cart";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST() {
  await dbConnect();
  const token = cookies().get("token")?.value;
  const user = jwt.verify(token, process.env.JWT_SECRET);

  const cart = await Cart.findOne({ userId: user.id });
  const total = cart.items.reduce((s, i) => s + i.price * i.qty, 0);

  const dbUser = await User.findById(user.id);
  if (dbUser.walletBalance < total) {
    return Response.json({ error: "Insufficient wallet" }, { status: 400 });
  }

  dbUser.walletBalance -= total;
  await dbUser.save();
  await Cart.deleteOne({ userId: user.id });

  return Response.json({ success: true });
}
