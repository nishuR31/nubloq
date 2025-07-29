
import express from "express";
import {
forgotPassword,verifyOtp,changePassword
} from "../controllers/forgot.controller.js";

const router = express.Router();

router.post("/send-otp",forgotPassword);
router.post("/verify-otp",verifyOtp);
router.post("/reset-password",changePassword);


export default router;
