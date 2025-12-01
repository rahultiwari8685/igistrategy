import express from "express";
import upload from "../middlewares/upload.js";

import {
    createBlog,
    getBlogs,
    getBlog,
    updateBlog,
    deleteBlog,
} from "../controllers/blogController.js";


const router = express.Router();

router.post("/saveBlog", upload.single("thumbnail"), createBlog);
router.get("/getAllBlog", getBlogs);
router.get("/:id", getBlog);
router.put("/:id", upload.single("thumbnail"), updateBlog);
router.delete("/:id", deleteBlog);

export default router;
