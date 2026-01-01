import Report from "../models/Report.js";


export const createReport = async (req, res) => {
    try {
        const report = new Report({
            report_type: req.body.report_type,
            title: req.body.title,
            overview: req.body.overview,
            description: req.body.description,
            state: req.body.state,
            constituency: req.body.constituency,
            data: JSON.parse(req.body.data || "{}"),

            preview_pdf: req.files?.preview_pdf?.[0]?.path || "",
            report_pdf: req.files?.report_pdf?.[0]?.path || ""
        });

        await report.save();
        res.json({ status: true, message: "Report created", data: report });

    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
};


export const getReports = async (req, res) => {
    try {
        const filter = {};

        if (req.query.report_type)
            filter.report_type = req.query.report_type;

        if (req.query.state)
            filter.state = req.query.state;

        if (req.query.constituency)
            filter.constituency = req.query.constituency;

        const reports = await Report.find(filter).sort({ createdAt: -1 });
        res.json({ status: true, data: reports });

    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
};


export const getReportById = async (req, res) => {
    const report = await Report.findById(req.params.id);
    res.json({ status: true, data: report });
};

export const updateReport = async (req, res) => {
    try {
        const updateData = {
            ...req.body,
            data: JSON.parse(req.body.data || "{}")
        };

        if (req.files?.preview_pdf)
            updateData.preview_pdf = req.files.preview_pdf[0].path;

        if (req.files?.report_pdf)
            updateData.report_pdf = req.files.report_pdf[0].path;

        const updated = await Report.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        res.json({ status: true, message: "Updated", data: updated });

    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
};

export const deleteReport = async (req, res) => {
    await Report.findByIdAndDelete(req.params.id);
    res.json({ status: true, message: "Deleted" });
};

import ReportAccess from "../models/ReportAccess.js";
import Subscription from "../models/Subscription.js";
import Plan from "../models/Plan.js";

export const accessFullReport = async (req, res) => {
    try {
        const customerId = req.user.customerId;
        const reportId = req.params.id;

        /* ---------- CHECK REPORT ---------- */
        const report = await Report.findById(reportId);
        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not found"
            });
        }

        /* ---------- CHECK ACTIVE SUBSCRIPTION ---------- */
        const subscription = await Subscription.findOne({
            customer_id: customerId,
            status: "active",
            end_date: { $gte: new Date() }
        });

        if (!subscription) {
            return res.status(403).json({
                success: false,
                message: "Active subscription required"
            });
        }

        const plan = await Plan.findById(subscription.plan_id);

        /* ---------- CHECK REPORT LIMIT ---------- */
        if (plan.report_limit !== "unlimited") {
            const used = await ReportAccess.countDocuments({
                customer_id: customerId,
                plan_id: plan._id
            });

            if (used >= Number(plan.report_limit)) {
                return res.status(403).json({
                    success: false,
                    message: "Report limit exceeded"
                });
            }
        }

        /* ---------- SAVE ACCESS (ONCE) ---------- */
        const already = await ReportAccess.findOne({
            customer_id: customerId,
            report_id: reportId
        });

        if (!already) {
            await ReportAccess.create({
                customer_id: customerId,
                report_id: reportId,
                plan_id: plan._id
            });
        }

        /* ---------- RETURN FULL REPORT ---------- */
        res.json({
            success: true,
            data: {
                title: report.title,
                full_pdf: report.report_pdf
            }
        });

    } catch (err) {
        console.error("FULL REPORT ERROR:", err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

