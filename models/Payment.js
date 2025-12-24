import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    userEmail: String,
    orderId: mongoose.Schema.Types.ObjectId,
    amount: Number,
    provider: String,
    paymentId: String,
    paymentRequestId: String,
    status: String
  },
  { timestamps: true }
);

export default mongoose.models.Payment ||
  mongoose.model("Payment", PaymentSchema);
