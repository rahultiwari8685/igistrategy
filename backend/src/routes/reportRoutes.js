import express from "express";
import upload from "../middlewares/upload.js";
import {
    createReport,
    getReports,
    getReportById,
    updateReport,
    deleteReport
} from "../controllers/reportController.js";

const router = express.Router();

// CREATE
router.post(
    "/saveReport",
    upload.fields([
        { name: "preview_pdf", maxCount: 1 },
        { name: "report_pdf", maxCount: 1 }
    ]),
    createReport
);

// READ (LIST)
router.get("/getAllReport", getReports);

// READ (SINGLE)
router.get("/getReportById/:id", getReportById);

// UPDATE
router.put(
    "/:id",
    upload.fields([
        { name: "preview_pdf", maxCount: 1 },
        { name: "report_pdf", maxCount: 1 }
    ]),
    updateReport
);

// DELETE
router.delete("/:id", deleteReport);

export default router;
