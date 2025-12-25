import dbConnect from "@/lib/mongodb";
import WeeklyMenu from "@/models/WeeklyMenu";
import { getUserFromToken } from "@/lib/auth";

export async function GET() {
  await dbConnect();
  return Response.json(await WeeklyMenu.find().sort({ createdAt: -1 }));
}

export async function POST(req) {
  await dbConnect();
  const user = getUserFromToken();
  if (!user || user.role !== "admin")
    return Response.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();

  // ❗ only ONE published menu allowed
  await WeeklyMenu.updateMany({}, { published: false });

  const menu = await WeeklyMenu.create({
    days: body.days,
    published: true,
  });

  return Response.json(menu);
}

export async function DELETE(req) {
  await dbConnect();
  const { id } = await req.json();
  await WeeklyMenu.findByIdAndDelete(id);
  return Response.json({ ok: true });
}
