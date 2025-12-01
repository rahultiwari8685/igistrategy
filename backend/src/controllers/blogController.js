import Blog from "../models/Blog.js";

export const createBlog = async (req, res) => {
    try {
        const {
            title,
            slug,
            subtitle,
            categories,
            type,
            videoType,
            youtubeUrl,
            content,
        } = req.body;

        const thumbnail = req.file ? req.file.filename : "";

        const blog = await Blog.create({
            title,
            slug,
            subtitle,
            categories: categories ? JSON.parse(categories) : [],
            type,
            videoType,
            youtubeUrl,
            content: content ? JSON.parse(content) : "",
            thumbnail,
        });

        return res.status(201).json({ success: true, data: blog });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};



export const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find()
            .populate("categories", "name slug")
            .sort({ createdAt: -1 });

        return res.status(200).json({ success: true, data: blogs });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};


export const getBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate("categories");

        if (!blog) return res.status(404).json({ error: "Blog not found" });

        return res.status(200).json({ success: true, data: blog });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


export const updateBlog = async (req, res) => {
    try {
        const {
            title,
            slug,
            subtitle,
            categories,
            type,
            videoType,
            youtubeUrl,
            content,
        } = req.body;

        const updateData = {
            title,
            slug,
            subtitle,
            categories: JSON.parse(categories),
            type,
            videoType,
            youtubeUrl,
            content: JSON.parse(content),
        };

        if (req.file) updateData.thumbnail = req.file.filename;

        const updated = await Blog.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
        });

        return res.status(200).json({ success: true, data: updated });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};


export const deleteBlog = async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        return res.status(200).json({ success: true, message: "Blog deleted" });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};
