const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require("../models/User.model.js");
const { get } = require('../routes/authRoutes.js');

//Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
};

//Register User
const registerUser = async (req ,res) => {
    const { fullName, email, password, profileImageUrl } = req.body;
    if(!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required !" });
    }
    try {
        //Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists !" });
        }
        //Create new user
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
        });

        res.status(201).json({
            success:true,
            message: "User Registered Successfully !",
            id: user._id,
            user,
            token:generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: "User Registering failed!. Error :",error});
    }
};
//Login User
const loginUser = async (req ,res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(400).json({ message: "All fields are required !" });
    }
    try {
        //Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials !" });
        }
        //Check if password is correct
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials !" });
        }
        res.status(200).json({
            success:true,
            message: "User Logged In Successfully !",
            id: user._id,
            user,
            token:generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: "User Logging in failed!. Error :",error});
    }
};
//Get user info
const getUserInfo = async(req , res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found !",
            });
        }
        return res.status(200).json({
            success:true,
            message: "User Info fetched successfully !",
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching user info !",
            error
        });
    }
}
//Logout User
const logoutUser = async (req ,res) => {};

//update profileImageUrl
const updateProfileImageUrl = async (req, res) => {
    const { profileImageUrl } = req.body;
    if (!profileImageUrl) {
        return res.status(400).json({ message: "Profile image URL is required!" });
    }
    try {
        const user = await User.findByIdAndUpdate(req.user.id, { profileImageUrl }, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }
        res.status(200).json({
            success: true,
            message: "Profile image updated successfully!",
            user
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating profile image!", error });
    }
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUserInfo,
    updateProfileImageUrl
};