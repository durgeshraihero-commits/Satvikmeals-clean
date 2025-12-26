import dbConnect from "@/lib/mongodb";
import Cart from "@/models/Cart";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default async function Success() {
  await dbConnect();

  const token = cookies().get("token")?.value;
  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await Cart.deleteOne({ userEmail: decoded.email });
  }

  return <h1>Payment Successful 🎉</h1>;
}
