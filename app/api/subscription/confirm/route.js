import User from "@/models/User";
import dbConnect from "@/lib/mongodb";

export async function POST(req) {
  await dbConnect();
  const { userId, plan } = await req.json();

  const user = await User.findById(userId);

  if (user.referredBy && plan >= 3099) {
    const referrer = await User.findOne({
      referralCode: user.referredBy,
    });

    if (referrer) {
      referrer.walletBalance += 100;
      await referrer.save();
    }
  }

  return Response.json({ success: true });
}
