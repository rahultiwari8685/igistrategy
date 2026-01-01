import mongoose from "mongoose";

const reportAccessSchema = new mongoose.Schema(
    {
        customer_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            required: true
        },
        report_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Report",
            required: true
        },
        plan_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Plan",
            required: true
        },
        accessed_at: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);

export default mongoose.model("ReportAccess", reportAccessSchema);
