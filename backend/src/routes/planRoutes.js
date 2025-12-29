
import express from "express";
import {
    createPlan,
    getPlans,
    getPlanById,
    updatePlan,
    togglePlanStatus
} from "../controllers/planController.js";

const router = express.Router();

// GET ALL PLANS
router.get("/getAllPlans", getPlans);

// CREATE PLAN
router.post("/savaPlan", createPlan);

/* ---------- DYNAMIC ROUTES LAST ---------- */

// GET SINGLE PLAN
router.get("/:id", getPlanById);

// UPDATE PLAN
router.put("/:id", updatePlan);

// TOGGLE STATUS
router.patch("/toggle/:id", togglePlanStatus);

export default router;
