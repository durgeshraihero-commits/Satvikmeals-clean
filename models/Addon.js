import mongoose from "mongoose";

const AddonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  available: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export default mongoose.models.Addon ||
  mongoose.model("Addon", AddonSchema);
