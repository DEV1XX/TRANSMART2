const express = require('express');
const { protect } = require("../middleware/authMiddleware.js")
const {
    registerUser,
    loginUser,
    logoutUser,
    getUserInfo,
} = require("../controllers/authController.js");

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/getUser', protect, getUserInfo);

module.exports = router;