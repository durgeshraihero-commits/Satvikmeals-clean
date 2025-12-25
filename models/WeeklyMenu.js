import mongoose from "mongoose";

const DaySchema = new mongoose.Schema({
  date: String,
  lunch: {
    name: String,
    image: String,
  },
  dinner: {
    name: String,
    image: String,
  },
});

const WeeklyMenuSchema = new mongoose.Schema({
  days: [DaySchema],
  published: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.WeeklyMenu ||
  mongoose.model("WeeklyMenu", WeeklyMenuSchema);
