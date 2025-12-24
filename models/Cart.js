import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true
    },
    items: [
      {
        itemId: String,
        name: String,
        price: Number,
        quantity: Number,
        image: String
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.models.Cart ||
  mongoose.model("Cart", CartSchema);
