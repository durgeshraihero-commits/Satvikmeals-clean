import dbConnect from "@/lib/mongodb";
import WeeklyMenu from "@/models/WeeklyMenu";
import { getUserFromToken } from "@/lib/auth";

export async function POST(req) {
  await dbConnect();
  const user = getUserFromToken();

  if (!user || user.role !== "admin") {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const { days } = await req.json();

  if (!days || days.length === 0) {
    return Response.json({ error: "No days added" }, { status: 400 });
  }

  // ❗ Unpublish old menus
  await WeeklyMenu.updateMany({}, { published: false });

  const menu = await WeeklyMenu.create({
    days,
    published: true,
  });

  return Response.json(menu);
}
