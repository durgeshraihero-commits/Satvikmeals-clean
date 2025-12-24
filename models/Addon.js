import mongoose from "mongoose";

const AddonSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    image: String,
    description: String,
    available: {
      type: Boolean,
      default: true, // ✅ REQUIRED
    },
  },
  { timestamps: true }
);

export default mongoose.models.Addon ||
  mongoose.model("Addon", AddonSchema);
