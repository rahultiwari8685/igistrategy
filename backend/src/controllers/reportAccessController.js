import Report from "../models/Report.js";
import ReportAccess from "../models/ReportAccess.js";

export const accessFullReport = async (req, res) => {
    try {
        const customerId = req.user.customerId;
        const reportId = req.params.id;
        const planId = req.plan._id;

        const report = await Report.findById(reportId);
        if (!report) {
            return res.status(404).json({ success: false, message: "Report not found" });
        }

        // save access if not exists
        const exists = await ReportAccess.findOne({
            customer_id: customerId,
            report_id: reportId
        });

        if (!exists) {
            await ReportAccess.create({
                customer_id: customerId,
                report_id: reportId,
                plan_id: planId
            });
        }

        res.json({
            success: true,
            data: {
                title: report.title,
                full_pdf: report.full_pdf
            }
        });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
