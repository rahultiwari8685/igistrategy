import Category from "../models/Category.js";
import { slugify } from "../helpers/slugify.js";


export const createCategory = async (req, res) => {
    try {
        const { name, parentCategory, metaTitle, metaDescription, showInMenu } = req.body;

        if (!name) {
            return res.status(400).json({ success: false, message: "Name is required" });
        }

        const slug = slugify(name);

        const category = await Category.create({
            name,
            slug,
            parentCategory: parentCategory || null,
            metaTitle,
            metaDescription,
            showInMenu
        });

        res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: category
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find()
            .populate("parentCategory", "name slug")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: categories.length,
            data: categories
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


export const updateCategory = async (req, res) => {
    try {
        const { _id, name, parentCategory, metaTitle, metaDescription, showInMenu } = req.body;

        if (!_id) {
            return res.status(400).json({ success: false, message: "Category ID required" });
        }

        const updateData = {
            parentCategory: parentCategory || null,
            metaTitle,
            metaDescription,
            showInMenu
        };

        if (name) {
            updateData.name = name;
            updateData.slug = slugify(name);
        }

        const updated = await Category.findByIdAndUpdate(_id, updateData, { new: true });

        if (!updated) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: updated
        });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


export const deleteCategory = async (req, res) => {
    try {
        const { _id } = req.body;

        if (!_id) {
            return res.status(400).json({ success: false, message: "Category ID is required" });
        }

        const deleted = await Category.findByIdAndDelete(_id);

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        res.status(200).json({
            success: true,
            message: "Category deleted successfully",
            data: deleted
        });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
