import dotenv from "dotenv";
dotenv.config();  // Must come before using process.env

import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import blogRoutes from "./routes/blogRoutes.js"

import authRoutes from "./routes/auth.js";

import cors from "cors";

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/blogs", blogRoutes);


app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);



const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

console.log("MONGO_URI from env:", MONGO_URI);


mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Failed:", err.message));

app.get("/", (req, res) => {
    res.send("API is working!");
});




app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
