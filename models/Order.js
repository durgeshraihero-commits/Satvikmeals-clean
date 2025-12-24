import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true
    },

    items: [
      {
        name: {
          type: String,
          required: true
        },
        price: {
          type: Number,
          required: true
        },
        quantity: {
          type: Number,
          required: true
        },
        image: {
          type: String,
          default: ""
        }
      }
    ],

    totalAmount: {
      type: Number,
      required: true
    },

    paymentMethod: {
      type: String,
      enum: ["wallet", "online"],
      default: "wallet"
    },

    status: {
      type: String,
      default: "paid"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.models.Order ||
  mongoose.model("Order", OrderSchema);
