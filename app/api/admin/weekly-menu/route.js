import dbConnect from "@/lib/mongodb";
import WeeklyMenu from "@/models/WeeklyMenu";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    await dbConnect();

    // 🔐 admin check
    const token = cookies().get("token")?.value;
    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (user.role !== "admin") {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    // ✅ ADMIN MUST SEE ALL MENUS
    const menus = await WeeklyMenu.find({})
      .sort({ createdAt: -1 });

    return Response.json(menus);
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed to load menus" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const { days } = await req.json();

    // ❗ Unpublish old menus
    await WeeklyMenu.updateMany({}, { published: false });

    const menu = await WeeklyMenu.create({
      days,
      published: true,
    });

    return Response.json({ success: true, menu });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Publish failed" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await dbConnect();
    const { id } = await req.json();

    await WeeklyMenu.findByIdAndDelete(id);

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Delete failed" }, { status: 500 });
  }
}
