import dbConnect from "../../../../lib/mongodb";
import Complaint from "../../../../models/Complaint";
import { requireAdmin } from "../../../../lib/isAdmin";

export async function GET() {
  requireAdmin();
  await dbConnect();
  return Response.json(await Complaint.find().populate("userId"));
}
