import dbConnect from "../../../../lib/mongodb";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await dbConnect();

    let { name, email, phone, password } = await req.json();

    if (!email || !phone || !password) {
      return Response.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    // ✅ NORMALIZE
    email = email.trim().toLowerCase();
    phone = phone.replace(/\D/g, "");

    // ✅ CHECK BOTH EMAIL & PHONE
    const exists = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (exists) {
      return Response.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "user",
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return Response.json(
      { error: "Registration failed" },
      { status: 500 }
    );
  }
}
