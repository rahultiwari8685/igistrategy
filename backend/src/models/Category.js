import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true
        },
        parentCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            default: null
        },
        metaTitle: {
            type: String,
            default: ""
        },
        metaDescription: {
            type: String,
            default: ""
        },
        showInMenu: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
