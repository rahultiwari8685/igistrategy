import Subscription from "../models/Subscription.js";
import Plan from "../models/Plan.js";

export const createSubscription = async (req, res) => {
    const { customer_id, plan_id } = req.body;

    const plan = await Plan.findById(plan_id);

    const start = new Date();
    const end = new Date();

    if (plan.billing_cycle === "monthly") {
        end.setMonth(end.getMonth() + 1);
    } else {
        end.setFullYear(end.getFullYear() + 1);
    }

    const subscription = await Subscription.create({
        customer_id,
        plan_id,
        start_date: start,
        end_date: end
    });

    res.json({ success: true, data: subscription });
};

export const getSubscriptionByCustomer = async (req, res) => {
    const subscription = await Subscription.findOne({
        customer_id: req.params.customerId,
        status: "active"
    }).populate("plan_id");

    res.json({ success: true, data: subscription });
};
