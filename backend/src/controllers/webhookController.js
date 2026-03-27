import crypto from "crypto";
import Payment from "../models/Payment.js";
import Subscription from "../models/Subscription.js";
import Plan from "../models/Plan.js";

// export const razorpayWebhook = async (req, res) => {
//     const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

//     const signature = crypto
//         .createHmac("sha256", secret)
//         .update(JSON.stringify(req.body))
//         .digest("hex");

//     if (signature !== req.headers["x-razorpay-signature"]) {
//         return res.status(400).json({ message: "Invalid signature" });
//     }

//     const event = req.body.event;
//     const payload = req.body.payload;

//     if (event === "payment.captured") {
//         const paymentData = payload.payment.entity;

//         const payment = await Payment.findOne({
//             razorpay_order_id: paymentData.order_id
//         });

//         if (!payment) return res.json({});

//         payment.status = "success";
//         payment.razorpay_payment_id = paymentData.id;
//         await payment.save();

//         const plan = await Plan.findById(payment.plan_id);

//         const start = new Date();
//         const end = new Date(start);

//         if (plan.billing_cycle === "monthly") {
//             end.setMonth(end.getMonth() + 1);
//         } else {
//             end.setFullYear(end.getFullYear() + 1);
//         }

//         await Subscription.create({
//             customer_id: payment.customer_id,
//             plan_id: payment.plan_id,
//             start_date: start,
//             end_date: end,
//             status: "active"
//         });
//     }

//     res.json({ received: true });
// };

export const razorpayWebhook = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const signature = req.headers["x-razorpay-signature"];

    if (!signature) {
      return res.status(400).json({ message: "Missing signature" });
    }

    // ✅ Use RAW body
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(req.body)
      .digest("hex");

    if (expectedSignature !== signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    const body = JSON.parse(req.body.toString());

    const event = body.event;
    const payload = body.payload;

    if (event === "payment.captured") {
      const paymentData = payload.payment.entity;

      const payment = await Payment.findOne({
        razorpay_order_id: paymentData.order_id,
      });

      if (!payment) return res.json({ received: true });

      // ✅ Prevent duplicate processing
      if (payment.status === "success") {
        return res.json({ received: true });
      }

      payment.status = "success";
      payment.razorpay_payment_id = paymentData.id;
      await payment.save();

      const plan = await Plan.findById(payment.plan_id);

      if (!plan) {
        return res.status(500).json({ message: "Plan not found" });
      }

      const start = new Date();
      const end = new Date(start);

      if (plan.billing_cycle === "monthly") {
        end.setMonth(end.getMonth() + 1);
      } else {
        end.setFullYear(end.getFullYear() + 1);
      }

      // ✅ Prevent duplicate subscription
      const existing = await Subscription.findOne({
        customer_id: payment.customer_id,
        status: "active",
        end_date: { $gte: new Date() },
      });

      if (!existing) {
        await Subscription.create({
          customer_id: payment.customer_id,
          plan_id: payment.plan_id,
          start_date: start,
          end_date: end,
          status: "active",
        });
      }
    }

    res.json({ received: true });
  } catch (err) {
    console.error("Webhook Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
