import express from "express";
import {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/saveCategory", createCategory);
router.get("/getAllCategory", getAllCategories);
router.post("/updateCategory", updateCategory);
router.post("/deleteCategory", deleteCategory);

export default router;
