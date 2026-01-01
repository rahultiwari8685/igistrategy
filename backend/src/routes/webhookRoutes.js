import express from "express";
import { razorpayWebhook } from "../controllers/webhookController.js";

const router = express.Router();


router.post(
    "/razorpay",
    express.json({
        verify: (req, res, buf) => {
            req.rawBody = buf;
        }
    }),
    razorpayWebhook
);

export default router; 
