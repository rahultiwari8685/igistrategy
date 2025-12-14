import express from "express";
import {
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer
} from "../controllers/customerController.js";

const router = express.Router();

router.post("/saveCustomer", createCustomer);
router.get("/", getCustomers);
router.get("/:id", getCustomerById);
router.put("/updateCustomer:id", updateCustomer);

export default router;
