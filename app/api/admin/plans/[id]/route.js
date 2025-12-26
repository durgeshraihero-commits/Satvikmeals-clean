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

// ✅ DELETE PLAN
export async function DELETE(req, { params }) {
  const admin = getAdmin();
  if (!admin)
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  await Plan.findByIdAndDelete(params.id);

  return Response.json({ success: true });
}
