import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  purpose: { type: String },
  paymentId: { type: String },
  requestId: { type: String },
  status: { type: String },
  source: { type: String, enum: ["cart", "subscription"] },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);
