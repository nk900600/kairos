const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post("/signup", authController.signup);
router.post("/logout", authController.logout);
router.post("/refresh-token", authController.getRefreshToken);
router.get("/token", authController.createTokenApi);
router.post("/login", authController.login);
router.post("/generate-otp", authController.generateOtp);
module.exports = router;
