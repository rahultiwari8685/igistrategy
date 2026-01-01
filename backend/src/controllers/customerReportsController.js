import ReportAccess from "../models/ReportAccess.js";

export const getMyReports = async (req, res) => {
    try {
        const customerId = req.user.customerId;

        const accesses = await ReportAccess.find({ customer_id: customerId })
            .populate("report_id")
            .populate("plan_id")
            .sort({ accessed_at: -1 });

        const reports = accesses.map(a => ({
            id: a.report_id._id,
            title: a.report_id.title,
            report_type: a.report_id.report_type,
            full_pdf: a.report_id.full_pdf,
            plan: a.plan_id.name,
            accessed_at: a.accessed_at
        }));

        res.json({ success: true, data: reports });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
