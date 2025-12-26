import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    phone: {
    type: String,
    required: true,
    match: /^[6-9]\d{9}$/  // ✅ VALID INDIAN NUMBER
  },

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
