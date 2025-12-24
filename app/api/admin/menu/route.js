import dbConnect from "@/lib/mongodb";
import Menu from "@/models/Menu";
import { getUserFromToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req) {
  await dbConnect();
  const user = getUserFromToken();
  if (!user || user.role !== "admin") {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();

  const menu = await Menu.findOneAndUpdate(
    {},
    {
      title: "Today's Menu",
      items: body.items,
      published: true, // ✅ MUST BE TRUE
    },
    { upsert: true, new: true }
  );

  return Response.json(menu);
}
