import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    phone: String,

    password: String,

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"   // ✅ FIX
    },

    walletBalance: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model("User", UserSchema);
