import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    totalAmount: {
      type: Number,
      required: true
    },
    paymentId: {
      type: String,
      required: true
    },
    paymentStatus: {
      type: String,
      default: "Credit"
    },
    paymentMethod: {
      type: String,
      default: "online"
    }
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model("Order", OrderSchema);
