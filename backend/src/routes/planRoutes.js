
// import express from "express";
// import {
//     createPlan,
//     getPlans,
//     getPlanById,
//     updatePlan,
//     togglePlanStatus
// } from "../controllers/planController.js";

// const router = express.Router();

// router.get("/getAllPlans", getPlans);


// router.post("/savaPlan", createPlan);


// router.get("/:id", getPlanById);


// router.put("/:id", updatePlan);

// router.patch("/toggle/:id", togglePlanStatus);

// export default router;


import express from "express";
import {
    createPlan,
    getPlans,
    getPlanById,
    updatePlan,
    togglePlanStatus
} from "../controllers/planController.js";

const router = express.Router();

/* ---------- STATIC ROUTES FIRST ---------- */
router.get("/getAllPlans", getPlans);
router.post("/savePlan", createPlan);
router.patch("/toggle/:id", togglePlanStatus);

/* ---------- DYNAMIC ROUTES LAST ---------- */
router.get("/:id", getPlanById);
router.put("/:id", updatePlan);

export default router;

