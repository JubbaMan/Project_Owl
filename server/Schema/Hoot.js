import mongoose from "mongoose";

const hootSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    content: { type: String, default: "", required: true },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    authorName: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Hoot", hootSchema);
