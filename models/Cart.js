import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

export default mongoose.models.Cart ||
  mongoose.model("Cart", CartSchema);
