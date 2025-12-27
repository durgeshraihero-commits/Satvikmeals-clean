import dbConnect from "../../../../lib/mongodb";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export async function POST(req) {
  try {
    await dbConnect();

    let { name, email, phone, password, referralCode } = await req.json();

    if (!email || !phone || !password) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    email = email.trim().toLowerCase();
    phone = phone.replace(/\D/g, "");

    const exists = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (exists) {
      return Response.json({ error: "User already exists" }, { status: 409 });
    }

    let referredByUser = null;

    if (referralCode) {
      referredByUser = await User.findOne({ referralCode });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const myReferralCode = crypto.randomBytes(4).toString("hex").toUpperCase();

    await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      referralCode: myReferralCode,
      referredBy: referredByUser?._id || null,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return Response.json({ error: "Registration failed" }, { status: 500 });
  }
}
