import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
  email: { type: String, required: true },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: "Plan" },
  expiresAt: { type: Date },
  active: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Subscription || mongoose.model("Subscription", SubscriptionSchema);
