import mongoose from "mongoose";

const WeeklyMenuSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    items: { type: [String], required: true },
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.WeeklyMenu ||
  mongoose.model("WeeklyMenu", WeeklyMenuSchema);
