import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  userId: String,
  amount: Number,
  method: String,
  date: Date,
  status: String
});

export default mongoose.models.Payment ||
  mongoose.model("Payment", PaymentSchema);
