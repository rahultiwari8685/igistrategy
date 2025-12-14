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

/* ---------------- LIST + FILTER ---------------- */
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

/* ---------------- SINGLE ---------------- */
export const getReportById = async (req, res) => {
    const report = await Report.findById(req.params.id);
    res.json({ status: true, data: report });
};

/* ---------------- UPDATE ---------------- */
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

/* ---------------- DELETE ---------------- */
export const deleteReport = async (req, res) => {
    await Report.findByIdAndDelete(req.params.id);
    res.json({ status: true, message: "Deleted" });
};
