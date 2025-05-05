const jwt = require('jsonwebtoken');
const User = require("../models/User.model.js");

const protect = async (req ,res ,next) => {
    let token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Not authorised. No token."
        })
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user =  await User.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Not authorised, token failed!"
        })
    }
}

module.exports = { protect };