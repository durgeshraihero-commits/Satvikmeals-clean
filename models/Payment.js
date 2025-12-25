import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true },
    paymentId: { type: String, required: true },
    amount: Number,
    status: String,
    method: { type: String, default: "Instamojo" }
  },
  { timestamps: true }
);

export default mongoose.models.Payment ||
  mongoose.model("Payment", PaymentSchema);
