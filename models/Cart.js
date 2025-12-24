import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    items: [
      {
        itemId: String,
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Cart ||
  mongoose.model("Cart", CartSchema);
