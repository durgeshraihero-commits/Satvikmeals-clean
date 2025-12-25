import dbConnect from "@/lib/mongodb";
import Addon from "@/models/Addon";
import { getUserFromToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

/* GET ALL ADDONS (ADMIN) */
export async function GET() {
  await dbConnect();
  const user = getUserFromToken();

  if (!user || user.role !== "admin") {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const addons = await Addon.find({}).sort({ createdAt: -1 });
  return Response.json(addons);
}

/* CREATE ADDON */
export async function POST(req) {
  await dbConnect();
  const user = getUserFromToken();

  if (!user || user.role !== "admin") {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();

  const addon = await Addon.create({
    name: body.name,
    price: body.price,
    description: body.description || "",
    image: body.image || "",
    available: true,
  });

  return Response.json(addon);
}

/* DELETE ADDON */
export async function DELETE(req) {
  await dbConnect();
  const user = getUserFromToken();

  if (!user || user.role !== "admin") {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await req.json();
  await Addon.findByIdAndDelete(id);

  return Response.json({ success: true });
}
