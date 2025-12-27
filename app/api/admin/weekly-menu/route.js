import dbConnect from "@/lib/mongodb";
import WeeklyMenu from "@/models/WeeklyMenu";

export async function POST(req) {
  await dbConnect();

  const { days } = await req.json();

  if (!days || days.length === 0) {
    return Response.json({ error: "Menu empty" }, { status: 400 });
  }

  // ❗ Unpublish all old menus
  await WeeklyMenu.updateMany({}, { published: false });

  // ✅ Create & publish new menu
  const menu = await WeeklyMenu.create({
    days,
    published: true,
  });

  return Response.json({ success: true, menu });
}
