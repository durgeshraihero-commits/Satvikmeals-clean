import dbConnect from "@/lib/mongodb";
import Cart from "@/models/Cart";
import { getUserFromToken } from "@/lib/auth";
import axios from "axios";

export const dynamic = "force-dynamic";

export async function POST() {
  await dbConnect();
  const user = getUserFromToken();

  if (!user) {
    return Response.json({ error: "User not logged in" }, { status: 401 });
  }

  const cart = await Cart.findOne({ email: user.email });
  if (!cart || cart.items.length === 0) {
    return Response.json({ error: "Cart is empty" }, { status: 400 });
  }

  const amount = cart.items.reduce(
    (sum, i) => sum + Number(i.price) * i.quantity,
    0
  );

  const res = await axios.post(
    `${process.env.INSTAMOJO_BASE_URL}/payment-requests/`,
    {
      amount,
      purpose: "SatvikMeals Cart",
      buyer_email: user.email,
      redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
      send_email: true,
      allow_repeated_payments: false,
    },
    {
      headers: {
        "X-Api-Key": process.env.INSTAMOJO_API_KEY,
        "X-Auth-Token": process.env.INSTAMOJO_AUTH_TOKEN,
      },
    }
  );

  return Response.json({
    url: res.data.payment_request.longurl,
  });
}
