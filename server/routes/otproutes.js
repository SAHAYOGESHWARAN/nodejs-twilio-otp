const express = require("express");
const router = express.Router(); 
const { sendOtp, verifyOtp } = require("../controller/otpcontroller"); // Import OTP controller

// Define routes for sending and verifying OTP
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

// Export the router so it can be used in other parts of the application
module.exports = router;
