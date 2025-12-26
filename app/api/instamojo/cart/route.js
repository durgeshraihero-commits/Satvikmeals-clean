import dbConnect from "@/lib/mongodb";
import Cart from "@/models/Cart";
import User from "@/models/User";
import { getUserFromToken } from "@/lib/auth";
import axios from "axios";

export async function POST(req) {
  await dbConnect();
  const user = getUserFromToken(req);

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cart = await Cart.findOne({ userId: user._id });

  if (!cart || cart.items.length === 0) {
    return Response.json({ error: "Cart is empty" }, { status: 400 });
  }

  const total = cart.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  const response = await axios.post(
    `${process.env.INSTAMOJO_BASE_URL}/payment-requests/`,
    {
      purpose: "SatvikMeals Cart Order",
      amount: total,
      buyer_name: user.name || "Customer",
      email: user.email,
      phone: user.phone,
      redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
      send_email: false,
      send_sms: false,
    },
    {
      headers: {
        "X-Api-Key": process.env.INSTAMOJO_API_KEY,
        "X-Auth-Token": process.env.INSTAMOJO_AUTH_TOKEN,
      },
    }
  );

  return Response.json({
    url: response.data.payment_request.longurl,
  });
}
