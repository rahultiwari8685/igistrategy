import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
    {
        report_type: {
            type: String,
            enum: ["political", "corporate"],
            required: true
        },
        title: { type: String, required: true },
        overview: String,
        description: String,
        state: String,
        constituency: String,

        preview_pdf: String,
        report_pdf: String,

        data: Object
    },
    { timestamps: true }
);

export default mongoose.model("Report", reportSchema);
