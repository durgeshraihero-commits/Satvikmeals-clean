import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
    index: true,
  },
  items: [
    {
      itemId: String,
      name: String,
      price: Number,
      image: String,
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);
