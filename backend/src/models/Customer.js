import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        phone: {
            type: String
        },

        status: {
            type: String,
            enum: ["active", "blocked"],
            default: "active"
        }
    },
    { timestamps: true }
);

export default mongoose.model("Customer", customerSchema);
