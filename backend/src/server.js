import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import authRoutes from "./routes/auth.js";
import planRoutes from "./routes/planRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import webhookRoutes from "./routes/webhookRoutes.js";

import customerAuthRoutes from "./routes/customerAuth.js";
import pollRoutes from "./routes/pollRoutes.js";
import liveRoutes from "./routes/liveRoutes.js";
import rateLimit from "express-rate-limit";

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per IP
  message: {
    success: false,
    message: "Too many requests, please try again later",
  },
});

app.use(limiter);

app.use(
  cors({
    origin: ["https://igistrategy.com", "https://admin.igistrategy.com"],
    credentials: true,
  }),
);

app.use(express.json({ limit: "1mb" }));

app.use("/uploads", express.static("uploads"));

app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/webhooks", webhookRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/customer-auth", customerAuthRoutes);

app.use("/api/polls", pollRoutes);

app.use("/api/live", liveRoutes);

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;

console.log("MONGO_URI from env:", MONGO_URI);

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err.message));

app.get("/", (req, res) => {
  res.send("API is working!");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
