import User from "../models/User.js";
import bcrypt from "bcryptjs";

import mongoose from "mongoose";

export const saveUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // ✅ Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    // ✅ Check duplicate email
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const profileImage = req.file ? req.file.filename : "";

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      profileImage,
    });

    // ✅ Remove password from response
    const userData = user.toObject();
    delete userData.password;

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: userData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// export const saveUser = async (req, res) => {
//     try {

//         const { name, email, phone, password } = req.body;

//         const profileImage = req.file ? req.file.filename : "";

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const user = await User.create({
//             name,
//             email,
//             phone,
//             password: hashedPassword,
//             profileImage
//         });

//         res.status(201).json({
//             success: true,
//             message: "User created successfully",
//             data: user,
//         });

//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             error: error.message,
//         });
//     }
// };

// export const getAllUsers = async (req, res) => {
//     try {
//         res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

//         const users = await User.find().sort({ createdAt: -1 });

//         res.status(200).json({
//             success: true,
//             count: users.length,
//             data: users,
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             error: error.message,
//         });
//     }
// };

export const getAllUsers = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 10, 50);

    const users = await User.find()
      .select("-password") // ✅ hide password
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      page,
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

// export const updateUser = async (req, res) => {
//     try {
//         const { _id, name, email, phone, password } = req.body;

//         if (!_id) {
//             return res.status(400).json({
//                 success: false,
//                 message: "User ID (_id) is required",
//             });
//         }

//         const existingUser = await User.findById(_id);
//         if (!existingUser) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found",
//             });
//         }

//         const profileImage = req.file
//             ? req.file.filename
//             : existingUser.profileImage;

//         const updatedUser = await User.findByIdAndUpdate(
//             _id,
//             {
//                 name,
//                 email,
//                 phone,
//                 password,
//                 profileImage,
//             },
//             { new: true }
//         );

//         res.status(200).json({
//             success: true,
//             message: "User updated successfully",
//             data: updatedUser,
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             error: error.message,
//         });
//     }
// };

export const updateUser = async (req, res) => {
  try {
    const { _id, name, email, phone, password } = req.body;

    if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({
        success: false,
        message: "Valid user ID is required",
      });
    }

    const existingUser = await User.findById(_id);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const updateData = {
      name,
      email,
      phone,
    };

    // ✅ Hash password if updated
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    // ✅ File update
    if (req.file) {
      updateData.profileImage = req.file.filename;
    }

    const updatedUser = await User.findByIdAndUpdate(_id, updateData, {
      new: true,
    }).select("-password");

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

// export const deleteUser = async (req, res) => {
//     try {
//         const { _id } = req.params;

//         if (!_id) {
//             return res.status(400).json({
//                 success: false,
//                 message: "User ID (_id) is required",
//             });
//         }

//         const deletedUser = await User.findByIdAndDelete(_id);

//         if (!deletedUser) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found",
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: "User deleted successfully",
//             data: deletedUser,
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             error: error.message,
//         });
//     }
// };

export const deleteUser = async (req, res) => {
  try {
    const { _id } = req.params;

    // ✅ Auth check (important)
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({
        success: false,
        message: "Valid user ID is required",
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
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
