import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
  email: String,
  plan: String,
  startDate: Date,
  endDate: Date,
  active: Boolean,
});

export default mongoose.models.Subscription ||
  mongoose.model("Subscription", SubscriptionSchema);
