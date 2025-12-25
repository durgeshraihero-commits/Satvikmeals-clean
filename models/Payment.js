import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    userEmail: String,
    paymentId: String,
    amount: Number,
    status: String,
    method: String
  },
  { timestamps: true }
);

export default mongoose.models.Payment ||
  mongoose.model("Payment", PaymentSchema);
