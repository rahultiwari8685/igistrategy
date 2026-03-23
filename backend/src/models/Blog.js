import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    subtitle: { type: String, default: "" },

    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],

    type: { type: String, enum: ["1", "2"], default: "1" },

    videoType: { type: String, enum: ["1", "2"], default: "1" },
    youtubeUrl: { type: String, default: "" },

    content: { type: Object, default: {} },

    thumbnail: { type: String, default: "" },
  },
  { timestamps: true },
);

export default mongoose.model("Blog", blogSchema);
