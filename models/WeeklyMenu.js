import mongoose from "mongoose";

const WeeklyMenuSchema = new mongoose.Schema(
  {
    title: String,
    items: [String],
    weekStart: Date,

    published: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.WeeklyMenu ||
  mongoose.model("WeeklyMenu", WeeklyMenuSchema);
