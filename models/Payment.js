import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true
    },
    paymentId: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      default: "Credit"
    },
    method: {
      type: String,
      default: "online"
    }
  },
  { timestamps: true }
);

export default mongoose.models.Payment ||
  mongoose.model("Payment", PaymentSchema);
