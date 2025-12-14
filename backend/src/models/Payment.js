import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
    {
        customer_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            required: true
        },

        plan_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Plan",
            required: true
        },

        razorpay_order_id: String,
        razorpay_payment_id: String,
        razorpay_signature: String,

        amount: Number,

        status: {
            type: String,
            enum: ["created", "success", "failed"],
            default: "created"
        }
    },
    { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
