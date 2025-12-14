import Razorpay from "razorpay";
import Plan from "../models/Plan.js";
import Payment from "../models/Payment.js";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

export const createOrder = async (req, res) => {
    try {
        const { customer_id, plan_id } = req.body;

        const plan = await Plan.findById(plan_id);
        if (!plan) {
            return res.status(404).json({ message: "Plan not found" });
        }

        const order = await razorpay.orders.create({
            amount: plan.price * 100,
            currency: "INR",
            receipt: `rcpt_${Date.now()}`
        });

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
        res.status(500).json({ message: err.message });
    }
};
