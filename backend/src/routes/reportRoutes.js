import express from "express";
import upload from "../middlewares/upload.js";
import {
    createReport,
    getReports,
    getReportById,
    updateReport,
    deleteReport,
    accessFullReport
} from "../controllers/reportController.js";

import { verifyCustomer } from "../middlewares/authMiddleware.js";

const router = express.Router();


router.post(
    "/saveReport",
    upload.fields([
        { name: "preview_pdf", maxCount: 1 },
        { name: "report_pdf", maxCount: 1 }
    ]),
    createReport
);

router.get("/getAllReport", getReports);



router.get(
    "/:id/full",
    verifyCustomer,
    accessFullReport
);


router.get("/getReportById/:id", getReportById);


router.put(
    "/:id",
    upload.fields([
        { name: "preview_pdf", maxCount: 1 },
        { name: "report_pdf", maxCount: 1 }
    ]),
    updateReport
);

router.delete("/:id", deleteReport);

export default router;
