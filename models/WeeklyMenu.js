import mongoose from "mongoose";

const DaySchema = new mongoose.Schema({
  day: String,
  lunch: String,
  dinner: String,
});

const WeeklyMenuSchema = new mongoose.Schema(
  {
    days: [DaySchema],

    published: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.WeeklyMenu ||
  mongoose.model("WeeklyMenu", WeeklyMenuSchema);
