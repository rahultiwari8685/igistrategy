import User from "../models/User.js";
import bcrypt from "bcryptjs";
export const saveUser = async (req, res) => {
    try {
        // const user = await User.create(req.body);


        const { name, email, phone, password } = req.body;


        // Multer adds file info to req.file
        const profileImage = req.file ? req.file.filename : "";

        const hashedPassword = await bcrypt.hash(password, 10);


        const user = await User.create({
            name,
            email,
            phone,
            password: hashedPassword,
            profileImage
        });

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user,
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

        const users = await User.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: users.length,
            data: users,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};



export const updateUser = async (req, res) => {
    try {
        const { _id, name, email, phone, password } = req.body;

        if (!_id) {
            return res.status(400).json({
                success: false,
                message: "User ID (_id) is required",
            });
        }

        // Find existing user
        const existingUser = await User.findById(_id);
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // If new profileImage uploaded, use it
        // else keep old image
        const profileImage = req.file
            ? req.file.filename
            : existingUser.profileImage;

        // Update user data
        const updatedUser = await User.findByIdAndUpdate(
            _id,
            {
                name,
                email,
                phone,
                password,
                profileImage,
            },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updatedUser,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};




export const deleteUser = async (req, res) => {
    try {
        const { _id } = req.params;


        if (!_id) {
            return res.status(400).json({
                success: false,
                message: "User ID (_id) is required",
            });
        }

        const deletedUser = await User.findByIdAndDelete(_id);

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: deletedUser,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};




