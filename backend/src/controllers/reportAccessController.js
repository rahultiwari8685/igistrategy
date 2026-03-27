import mongoose from "mongoose";
import Report from "../models/Report.js";
import ReportAccess from "../models/ReportAccess.js";

export const accessFullReport = async (req, res) => {
  try {
    const customerId = req.user?.customerId;
    const planId = req.plan?._id;
    const reportId = req.params.id;

    if (!customerId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!planId) {
      return res
        .status(403)
        .json({ success: false, message: "No active plan" });
    }

    if (!mongoose.Types.ObjectId.isValid(reportId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid report ID" });
    }

    const report = await Report.findById(reportId).select("title full_pdf");

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    await ReportAccess.updateOne(
      { customer_id: customerId, report_id: reportId },
      {
        $setOnInsert: {
          plan_id: planId,
        },
      },
      { upsert: true },
    );

    res.json({
      success: true,
      data: report,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
