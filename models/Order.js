import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userEmail: String,
    items: Array,
    totalAmount: Number,
    paymentId: String,
    paymentStatus: String
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model("Order", OrderSchema);
