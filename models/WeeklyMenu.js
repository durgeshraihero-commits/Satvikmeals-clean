import mongoose from "mongoose";

const DishSchema = new mongoose.Schema({
  name: String,
  image: String,
});

const DaySchema = new mongoose.Schema({
  date: String,
  lunch: [DishSchema],
  dinner: [DishSchema],
});

const WeeklyMenuSchema = new mongoose.Schema(
  {
    days: [DaySchema],
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.WeeklyMenu ||
  mongoose.model("WeeklyMenu", WeeklyMenuSchema);
