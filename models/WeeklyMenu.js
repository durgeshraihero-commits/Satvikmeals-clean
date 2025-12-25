import mongoose from "mongoose";

const DishSchema = new mongoose.Schema({
  name: String,
  image: String
});

const DaySchema = new mongoose.Schema({
  date: String, // "2025-01-15"
  lunch: DishSchema,
  dinner: DishSchema
});

const WeeklyMenuSchema = new mongoose.Schema({
  weekStart: String, // "2025-01-13"
  weekEnd: String,   // "2025-01-19"
  days: [DaySchema],
  published: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.WeeklyMenu ||
  mongoose.model("WeeklyMenu", WeeklyMenuSchema);
