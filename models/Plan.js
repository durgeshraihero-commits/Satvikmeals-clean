import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema({
  name: String,
  price: Number,
  durationDays: Number,
  active: { type: Boolean, default: true },
});

export default mongoose.models.Plan || mongoose.model("Plan", PlanSchema);
