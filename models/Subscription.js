import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
  userId: String,
  plan: String,
  price: Number,
  startDate: Date,
  endDate: Date,
  status: String
});

export default mongoose.models.Subscription ||
  mongoose.model("Subscription", SubscriptionSchema);
