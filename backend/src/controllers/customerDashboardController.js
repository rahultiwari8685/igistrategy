import Customer from "../models/Customer.js";
import Subscription from "../models/Subscription.js";

export const getCustomerDashboard = async (req, res) => {
    try {
        console.log("🧠 DASHBOARD HIT");
        console.log("🧠 REQ.USER =", req.user);

        if (!req.user || !req.user.customerId) {
            throw new Error("customerId missing in req.user");
        }

        const customerId = req.user.customerId;

        const customer = await Customer.findById(customerId).select("name email");

        if (!customer) {
            throw new Error("Customer not found");
        }

        const subscription = await Subscription.findOne({
            customer_id: customerId,
            status: "active",
            end_date: { $gte: new Date() }
        }).populate("plan_id");

        let subscriptionData = null;

        if (subscription && subscription.plan_id) {
            subscriptionData = {
                plan: subscription.plan_id.name,
                status: subscription.status,
                end_date: subscription.end_date,
                report_limit: subscription.plan_id.report_limit
            };
        }

        res.json({
            success: true,
            data: {
                customer,
                subscription: subscriptionData,
                reports: {
                    total_available: subscriptionData?.report_limit || 0,
                    viewed: 0,
                    recent: []
                }
            }
        });

    } catch (err) {
        console.error("🔥 DASHBOARD ERROR:", err.message);
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
