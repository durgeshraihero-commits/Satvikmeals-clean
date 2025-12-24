import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true },

    items: [
      {
        name: String,
        price: Number,
        quantity: Number,
        image: String
      }
    ],

    totalAmount: Number,

    paymentMethod: {
      type: String,
      enum: ["wallet", "online"],
      default: "online"
    },

    paymentId: String,
    paymentRequestId: String,

    status: {
      type: String,
      default: "paid"
    }
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model("Order", OrderSchema);
