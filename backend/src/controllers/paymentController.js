import Razorpay from "razorpay";
import Plan from "../models/Plan.js";
import Payment from "../models/Payment.js";


const getRazorpayInstance = () => {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        throw new Error("Razorpay keys missing in environment variables");
    }

    return new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    });
};

export const createOrder = async (req, res) => {
    try {
        const { customer_id, plan_id } = req.body;

        const plan = await Plan.findById(plan_id);
        if (!plan) {
            return res.status(404).json({ message: "Plan not found" });
        }


        const razorpay = getRazorpayInstance();

        const order = await razorpay.orders.create({
            amount: plan.price * 100, // paise
            currency: "INR",
            receipt: `rcpt_${Date.now()}`
        });

        console.log("PLAN PRICE:", plan.price);
        console.log("AMOUNT (PAISE):", plan.price * 100);
        console.log("KEY:", process.env.RAZORPAY_KEY_ID);


        await Payment.create({
            customer_id,
            plan_id,
            razorpay_order_id: order.id,
            amount: plan.price,
            status: "created"
        });

        res.json({
            order_id: order.id,
            amount: plan.price,
            key: process.env.RAZORPAY_KEY_ID
        });
    } catch (err) {
        console.error("🔥 FULL ERROR:", err);

        if (err?.error) {
            console.error("🔥 RAZORPAY ERROR:", err.error);
        }

        return res.status(500).json({
            success: false,
            message:
                err?.error?.description ||
                err?.error?.reason ||
                err.message ||
                "Unknown Razorpay error"
        });
    }

};
