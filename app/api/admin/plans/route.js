import dbConnect from "@/lib/mongodb";
import Plan from "@/models/Plan";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

function getAdmin() {
  const token = cookies().get("token")?.value;
  if (!token) return null;

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return user.role === "admin" ? user : null;
  } catch {
    return null;
  }
}

// ✅ GET ALL PLANS
export async function GET() {
  const admin = getAdmin();
  if (!admin)
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  const plans = await Plan.find().sort({ createdAt: -1 });
  return Response.json(plans);
}

// ✅ CREATE PLAN
export async function POST(req) {
  const admin = getAdmin();
  if (!admin)
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  const { name, price, durationDays } = await req.json();

  if (!name || !price || !durationDays) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  const plan = await Plan.create({
    name,
    price,
    durationDays,
  });

  return Response.json(plan);
}
