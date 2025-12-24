export const dynamic = "force-dynamic";

import dbConnect from "../../../lib/mongodb";
import Complaint from "../../../models/Complaint";
import { getUserId } from "@/lib/auth";

export async function POST(req) {
  await dbConnect();

  const userId = getUserId();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const complaint = await Complaint.create({
    userId,
    message: body.message,
  });

  return Response.json(complaint);
}
