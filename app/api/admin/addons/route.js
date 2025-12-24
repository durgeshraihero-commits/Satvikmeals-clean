import dbConnect from "@/lib/mongodb";
import Addon from "@/models/Addon";
import { getUserFromToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req) {
  await dbConnect();
  const user = getUserFromToken();

  if (!user || user.role !== "admin") {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const addon = await Addon.create({
    ...body,
    available: true,
  });

  return Response.json(addon);
}
