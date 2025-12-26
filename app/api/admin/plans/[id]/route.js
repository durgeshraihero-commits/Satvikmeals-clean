import dbConnect from "@/lib/mongodb";
import Plan from "@/models/Plan";

export async function DELETE(req, { params }) {
  await dbConnect();
  await Plan.findByIdAndDelete(params.id);
  return Response.json({ success: true });
}
