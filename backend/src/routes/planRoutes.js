
import express from "express";
import {
    createPlan,
    getPlans,
    getPlanById,
    updatePlan,
    togglePlanStatus
} from "../controllers/planController.js";

const router = express.Router();

// CREATE PLAN
router.post("/savePlan", createPlan);

// GET ALL PLANS
router.get("/getAllPlan", getPlans);

// GET SINGLE PLAN
router.get("/:id", getPlanById);

// UPDATE PLAN
router.put("/:id", updatePlan);

// TOGGLE STATUS
router.patch("/:id/status", togglePlanStatus);

export default router;
