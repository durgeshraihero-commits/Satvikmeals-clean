import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  itemId: String,
  name: String,
  price: Number,
  image: String,
  quantity: { type: Number, default: 1 }
});

const CartSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true },
    items: [CartItemSchema]
  },
  { timestamps: true }
);

export default mongoose.models.Cart ||
  mongoose.model("Cart", CartSchema);
