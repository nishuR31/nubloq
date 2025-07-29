// changePassword:auth/change-password

import codes from "../utils/codes.js";
import ApiErrorResponse from "../utils/ApiErrorResponse.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import isEmpty from "../utils/isEmpty.js";
import bcrypt from "bcrypt"; // Required to hash password
import User from "../models/user.model.js";
import {OTP} from "../utils/otp.js";
import sendOtp from "../utils/sendOtpMail.js";



export const changePassword = asyncHandler(async (req, res) => {
  let newData = {
    email: req.body.email ?? null,
    password: req.body.password ?? null,
  };
  let { email, password } = newData;
  if (isEmpty([password, email])) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse(
          "Both password and email are required",
          codes.badRequest
        ).res()
      );
  }

  let user = await User.findOne({email});
  if (!user) {
    return res
      .status(codes.notFound)
      .json(new ApiErrorResponse("User not found", codes.notFound).res());
  }

  if (!user.otp.verified) {
    {
      return res
        .status(codes.unauthorized)
        .json(
          new ApiErrorResponse("OTP is not verified", codes.unauthorized).res()
        );
    }
  }

  // Hash the new password
  const isSame = await bcrypt.compare(password, user.password);
  if (isSame) {
    return res
      .status(codes.conflict)
      .json(
        new ApiErrorResponse(
          "New password must be different",
          codes.conflict
        ).res()
      );
  }

  user.password = password;
  //   user.refreshToken = null;
  user.otp.verified = false;

  await user.save(); // Triggers schema validations (optional)

  return res.status(codes.ok).json(
    new ApiResponse("User password updated", codes.ok, {
      user: {
        _id: user._id,
        userName: user.userName,
        email: user.email,
        updatedAt: user.updatedAt,
      },
    }).res()
  );
});





// forgot: auth/forgot-password

export let forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (isEmpty([email])) {
    return res
      .status(codes.badRequest)
      .json(new ApiErrorResponse("Email is required", codes.badRequest).res());
  }

  const client = await User.findOne({email });

  if (!client) {
    return res
      .status(codes.notFound)
      .json( 
        new ApiErrorResponse("User with this email not found", codes.notFound, {
          email,
        }).res()
      );
  }

  const code = OTP();
  const hashOTP = await bcrypt.hash(code.toString(), 10);

  client.otp.code = hashOTP;
  client.otp.expiry = Date.now() + 15 * 60 * 1000; // ✅ 15 minutes in the future

  await client.save();

  await sendOtp(email,client.userName, code); // Send plain OTP or styled HTML  
  // to,username,otp

  return res
    .status(codes.ok)
    .json(
      new ApiResponse(
        "OTP sent to email, redirect to verification step",
        codes.ok,{email:email}
      ).res()
    );
});






// verifyForgotToken:auth/verify-token

export const verifyOtp = asyncHandler(async (req, res) => {
  const { otp, email } = req.body;

  if (!otp || !email) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse("Email or OTP is missing", codes.badRequest).res()
      );
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(codes.notFound)
      .json(new ApiErrorResponse("User not found", codes.notFound).res());
  }

  // Check if OTP expired
  if (!user.otp.expiry || user.otp.expiry < Date.now()) {
    return res
      .status(codes.unauthorized)
      .json(
        new ApiErrorResponse("OTP expired. Please request a new one.", codes.unauthorized).res()
      );
  }

  // Compare hashed OTP
  const isMatch = await  bcrypt.compare(otp, user.otp.code);
  if (!isMatch) {
    return res
      .status(codes.unauthorized)
      .json(new ApiErrorResponse("Incorrect OTP", codes.unauthorized).res());
  }

  // Clear OTP after success
  user.otp.code = null;
  user.otp.expiry = null;
  user.otp.verified=true;
  await user.save();

  return res
    .status(codes.ok)
    .json(
      new ApiResponse("OTP verified, proceed to reset password", codes.ok).res()
    );
});
