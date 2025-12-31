import express from "express";
import {
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer
} from "../controllers/customerController.js";
import { getCustomerDashboard } from "../controllers/customerDashboardController.js";
import { verifyCustomer } from "../middlewares/authMiddleware.js";

const router = express.Router();

/* ---------- DASHBOARD (STATIC, PROTECTED) ---------- */
router.get("/dashboard", verifyCustomer, getCustomerDashboard);

/* ---------- CUSTOMER CRUD ---------- */
router.post("/saveCustomer", createCustomer);
router.get("/", getCustomers);
router.get("/:id", getCustomerById);
router.put("/updateCustomer/:id", updateCustomer);

export default router;
