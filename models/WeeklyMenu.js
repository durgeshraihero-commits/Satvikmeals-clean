import mongoose from "mongoose";

const DishSchema = new mongoose.Schema({
  name: String,
  image: String
});

const DaySchema = new mongoose.Schema({
  date: String, // "2025-01-01"
  day: String,  // Monday
  lunch: [DishSchema],
  dinner: [DishSchema]
});

const WeeklyMenuSchema = new mongoose.Schema(
  {
    weekLabel: String, // "Week 1 (Jan 1 - Jan 7)"
    days: [DaySchema],
    published: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.models.WeeklyMenu ||
  mongoose.model("WeeklyMenu", WeeklyMenuSchema);
