import express from "express";
import { getLiveStatus } from "../controllers/liveController.js";

const router = express.Router();

router.get("/status", getLiveStatus);

export default router;
