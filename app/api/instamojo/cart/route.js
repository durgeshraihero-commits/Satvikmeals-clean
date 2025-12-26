import { cookies } from "next/headers";
import dbConnect from "@/lib/mongodb";
import Cart from "@/models/Cart";
import User from "@/models/User";
import axios from "axios";
import jwt from "jsonwebtoken";

export async function POST() {
  await dbConnect();

  // 1️⃣ Get logged in user
  const token = cookies().get("token")?.value;
  if (!token) {
    return Response.json({ error: "Not logged in" }, { status: 401 });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({ email: decoded.email });
  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  // 2️⃣ Load cart
  const cart = await Cart.findOne({ userEmail: user.email });
  if (!cart || cart.items.length === 0) {
    return Response.json({ error: "Cart is empty" }, { status: 400 });
  }

  const amount = cart.items.reduce(
    (sum, i) => sum + Number(i.price) * i.quantity,
    0
  );

  // 3️⃣ Create Instamojo payment
  const res = await axios.post(
    "https://www.instamojo.com/api/1.1/payment-requests/",
    {
      purpose: "SatvikMeals Order",
      amount,
      buyer_name: user.name,
      email: user.email,
      phone: user.phone,
      redirect_url: `${process.env.BASE_URL}/payment/success`,
    },
    {
      headers: {
        "X-Api-Key": process.env.INSTAMOJO_API_KEY,
        "X-Auth-Token": process.env.INSTAMOJO_AUTH_TOKEN,
      },
    }
  );

  // 4️⃣ DO NOT CLEAR CART HERE
  return Response.json({
    url: res.data.payment_request.longurl,
  });
}
