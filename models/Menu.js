import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Today's Menu",
    },
    items: [
      {
        name: String,
        price: Number,
        description: String,
        image: String,
      },
    ],
    published: {
      type: Boolean,
      default: true,   // ✅ IMPORTANT
    },
  },
  { timestamps: true }
);

export default mongoose.models.Menu ||
  mongoose.model("Menu", MenuSchema);
