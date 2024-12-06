const express = require("express");
// Express routing components
const router = express.Router();
const userController = require("../controllers/User-Controllers.js");
const { verify } = require("../auth.js");

// User Registration
router.post("/register", userController.registerUser);

// User Login
router.post("/login", userController.loginUser);

// Check if email exists
router.post('/check-email', userController.checkEmail);

// Get user details 
router.post("/details", userController.getProfile);

// Enroll a user
router.post("/enroll", userController.enroll);

module.exports = router;  // Export the router once, after all routes are defined
