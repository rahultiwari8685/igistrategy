import Report from "../models/Report.js";
import mongoose from "mongoose";

// export const createReport = async (req, res) => {
//     try {
//         const report = new Report({
//             report_type: req.body.report_type,
//             title: req.body.title,
//             overview: req.body.overview,
//             description: req.body.description,
//             state: req.body.state,
//             constituency: req.body.constituency,
//             data: JSON.parse(req.body.data || "{}"),

//             preview_pdf: req.files?.preview_pdf?.[0]?.path || "",
//             report_pdf: req.files?.report_pdf?.[0]?.path || ""
//         });

//         await report.save();
//         res.json({ status: true, message: "Report created", data: report });

//     } catch (err) {
//         res.status(500).json({ status: false, message: err.message });
//     }
// };

export const createReport = async (req, res) => {
  try {
    // ✅ Validate required fields
    const { report_type, title, overview, description, state, constituency } =
      req.body;

    if (!report_type || !title) {
      return res.status(400).json({
        status: false,
        message: "report_type and title are required",
      });
    }

    // ✅ Safe JSON parse
    let parsedData = {};
    try {
      parsedData = req.body.data ? JSON.parse(req.body.data) : {};
    } catch (err) {
      return res.status(400).json({
        status: false,
        message: "Invalid JSON in data field",
      });
    }

    // ✅ File validation (optional but recommended)
    const previewPdf = req.files?.preview_pdf?.[0]?.path || "";
    const reportPdf = req.files?.report_pdf?.[0]?.path || "";

    if (!reportPdf) {
      return res.status(400).json({
        status: false,
        message: "Report PDF is required",
      });
    }

    // ✅ Create report safely
    const report = new Report({
      report_type,
      title,
      overview,
      description,
      state,
      constituency,
      data: parsedData,
      preview_pdf: previewPdf,
      report_pdf: reportPdf,
    });

    await report.save();

    res.json({
      status: true,
      message: "Report created",
      data: report,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

// export const getReports = async (req, res) => {
//     try {
//         const filter = {};

//         if (req.query.report_type)
//             filter.report_type = req.query.report_type;

//         if (req.query.state)
//             filter.state = req.query.state;

//         if (req.query.constituency)
//             filter.constituency = req.query.constituency;

//         const reports = await Report.find(filter).sort({ createdAt: -1 });
//         res.json({ status: true, data: reports });

//     } catch (err) {
//         res.status(500).json({ status: false, message: err.message });
//     }
// };

export const getReports = async (req, res) => {
  try {
    const filter = {};

    if (req.query.report_type) filter.report_type = req.query.report_type;

    if (req.query.state) filter.state = req.query.state;

    if (req.query.constituency) filter.constituency = req.query.constituency;

    // ✅ Pagination
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 10, 50); // max 50

    const reports = await Report.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      status: true,
      page,
      limit,
      data: reports,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const getReportById = async (req, res) => {
  try {
    const reportId = req.params.id;

    // ✅ Validate ID
    if (!mongoose.Types.ObjectId.isValid(reportId)) {
      return res.status(400).json({
        status: false,
        message: "Invalid report ID",
      });
    }

    const report = await Report.findById(reportId);

    // ✅ Not found check
    if (!report) {
      return res.status(404).json({
        status: false,
        message: "Report not found",
      });
    }

    res.json({
      status: true,
      data: report,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const updateReport = async (req, res) => {
  try {
    const reportId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(reportId)) {
      return res.status(400).json({
        status: false,
        message: "Invalid report ID",
      });
    }

    let parsedData = {};
    try {
      parsedData = req.body.data ? JSON.parse(req.body.data) : {};
    } catch (err) {
      return res.status(400).json({
        status: false,
        message: "Invalid JSON in data field",
      });
    }

    const updateData = {
      report_type: req.body.report_type,
      title: req.body.title,
      overview: req.body.overview,
      description: req.body.description,
      state: req.body.state,
      constituency: req.body.constituency,
      data: parsedData,
    };

    // ✅ File updates
    if (req.files?.preview_pdf) {
      updateData.preview_pdf = req.files.preview_pdf[0].path;
    }

    if (req.files?.report_pdf) {
      updateData.report_pdf = req.files.report_pdf[0].path;
    }

    const updated = await Report.findByIdAndUpdate(reportId, updateData, {
      new: true,
    });

    // ✅ Not found check
    if (!updated) {
      return res.status(404).json({
        status: false,
        message: "Report not found",
      });
    }

    res.json({
      status: true,
      message: "Updated",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const deleteReport = async (req, res) => {
  try {
    const reportId = req.params.id;

    // ✅ Auth check (important)
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        status: false,
        message: "Unauthorized",
      });
    }

    // ✅ Validate ID
    if (!mongoose.Types.ObjectId.isValid(reportId)) {
      return res.status(400).json({
        status: false,
        message: "Invalid report ID",
      });
    }

    const deleted = await Report.findByIdAndDelete(reportId);

    // ✅ Not found check
    if (!deleted) {
      return res.status(404).json({
        status: false,
        message: "Report not found",
      });
    }

    res.json({
      status: true,
      message: "Deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

import ReportAccess from "../models/ReportAccess.js";
import Subscription from "../models/Subscription.js";
import Plan from "../models/Plan.js";

export const accessFullReport = async (req, res) => {
  try {
    const customerId = req.user?.customerId;
    const reportId = req.params.id;

    // ✅ Auth check
    if (!customerId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // ✅ Validate ID
    if (!mongoose.Types.ObjectId.isValid(reportId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid report ID",
      });
    }

    // ✅ Fetch report (only needed fields)
    const report = await Report.findById(reportId).select("title report_pdf");

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    // ✅ Check subscription
    const subscription = await Subscription.findOne({
      customer_id: customerId,
      status: "active",
      end_date: { $gte: new Date() },
    });

    if (!subscription) {
      return res.status(403).json({
        success: false,
        message: "Active subscription required",
      });
    }

    const plan = await Plan.findById(subscription.plan_id);

    if (!plan) {
      return res.status(500).json({
        success: false,
        message: "Plan not found",
      });
    }

    // ✅ LIMIT CHECK (still needed but not enough alone)
    if (plan.report_limit !== "unlimited") {
      const used = await ReportAccess.countDocuments({
        customer_id: customerId,
        plan_id: plan._id,
      });

      if (used >= Number(plan.report_limit)) {
        return res.status(403).json({
          success: false,
          message: "Report limit exceeded",
        });
      }
    }

    // ✅ SAFE UPSERT (prevents duplicates)
    await ReportAccess.updateOne(
      { customer_id: customerId, report_id: reportId },
      {
        $setOnInsert: {
          plan_id: plan._id,
        },
      },
      { upsert: true },
    );

    res.json({
      success: true,
      data: {
        title: report.title,
        full_pdf: report.report_pdf,
      },
    });
  } catch (err) {
    console.error("FULL REPORT ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
