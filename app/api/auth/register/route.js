import dbConnect from "../../../../lib/mongodb";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await dbConnect();

  const { name, email, phone, password } = await req.json();

  if (!email || !password) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  const exists = await User.findOne({ email });
  if (exists) {
    return Response.json({ error: "User already exists" }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    phone,
    password: hashedPassword,
    role: "user" // explicit but optional now
  });

  return Response.json({ success: true });
}
