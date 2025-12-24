import mongoose from "mongoose";

const ComplaintSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: String,
  status: { type: String, default: "open" },
}, { timestamps: true });

export default mongoose.models.Complaint ||
  mongoose.model("Complaint", ComplaintSchema);
