// dependencies
import express from "express";
import {
    activateAccountByOTPController,
  forgotPasswordAuthController,
  loginAuthController,
  logoutAuthController,
  myAccountController,
  registerAuthController,
} from "../controllers/authController.js";
import tokenVerify from "../middlewares/tokenVerify.js";

// create Router
const router = express.Router();

// all route
router.post("/register", registerAuthController);
router.post("/activate-account-by-otp/:token", activateAccountByOTPController);

router.post("/login", loginAuthController);
router.post("/logout", tokenVerify, logoutAuthController);
router.post("/forgot-password", forgotPasswordAuthController);

// temporary for middleware check 
router.get("/my-account", tokenVerify, myAccountController);

// exporter router
export default router;
