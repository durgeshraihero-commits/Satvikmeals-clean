import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

function getUser() {
  const token = cookies().get("token")?.value;
  if (!token) throw new Error("Unauthorized");
  return jwt.verify(token, process.env.JWT_SECRET);
}

export async function GET() {
  await dbConnect();
  const user = getUser();

  const dbUser = await User.findById(user.id);
  return Response.json({
    balance: dbUser.walletBalance,
    referralCode: dbUser.referralCode
  });
}
