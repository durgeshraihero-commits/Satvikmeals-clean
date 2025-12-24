import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userEmail: String,
    items: Array,
    totalAmount: Number,
    paymentId: String,
    paymentStatus: String,
    paymentMethod: {
      type: String,
      default: "online"
    }
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model("Order", OrderSchema);
