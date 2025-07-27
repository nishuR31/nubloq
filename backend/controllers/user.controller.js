import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";
import ApiErrorResponse from "../utils/ApiErrorResponse.js";
import ApiResponse from "../utils/ApiResponse.js";
import codes from "../utils/codes.js";
import hideEmail from "../utils/hideEmail.js";
import isEmpty from "../utils/isEmpty.js";
import { tokens } from "../utils/tokenization.js";
import tokenOptions from "../utils/tokenOptions.js";
import asyncHandler from "../utils/asyncHandler.js";

export const register = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password,userName } = req.body;
  if (isEmpty([ email, password,userName])) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse("All fields are required", codes.badRequest).res()
      );
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse("Invalid email format.", codes.badRequest).res()
      );
  }

  if (password.length < 8) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse(
          "Password must be atleast 8 characters long.",
          codes.badRequest
        ).res()
      );
  }

  if (!/\d/.test(password)) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse(
          "Password must have a digit [1,2...].",
          codes.badRequest
        ).res()
      );
  }

  if (!/[a-z]/.test(password)) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse(
          "Password must have a lowercase character [a-z].",
          codes.badRequest
        ).res()
      );
  }

  if (!/[A-Z]/.test(password)) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse(
          "Password must have an uppercase character [A-Z].",
          codes.badRequest
        ).res()
      );
  }

  if (/\s/.test(password)) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse(
          "Password must not have any spaces between.",
          codes.badRequest
        ).res()
      );
  }

  if (!/\W/.test(password)) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse(
          "Password must have a symbol [!,@...].",
          codes.badRequest
        ).res()
      );
  }

  const existingEmail = await User.findOne({ email });

  if (existingEmail) {
    return res
      .status(codes.conflict)
      .json(
        new ApiErrorResponse("Email already exists.", codes.conflict).res()
      );
  }

  const existingUsername = await User.findOne({ userName });

  if (existingUsername) {
    return res
      .status(codes.conflict)
      .json(
        new ApiErrorResponse(
          `Account with username : ${userName} already exists`,
          codes.conflict
        ).res()
      );
  }

  await User.create({
    firstName,
    lastName,
    email,
    password,
    userName
  });

  return res
    .status(codes.created)
    .json(
      new ApiResponse(
        "Account created and registered successfully,please return to login",
        codes.created,
        { userName: userName, email: hideEmail(email) }
      ).res()
    );
});

/////////////////////////////////////////////////////////////////

export const login = asyncHandler(async (req, res) => {
  if (req.user) {
    return res
      .status(codes.ok)
      .json(new ApiResponse("User already logged in.",codes.ok,{user:{_id:req.user._id,userName:req.user.userName}}).res());
  }
  const { emailUser, password } = req.body;
  if (!emailUser && !password) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse(
          "Username or email required with password.",
          codes.badRequest
        ).res()
      );
  }

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const field = emailRegex.test(emailUser)? "email":"userName" ;

  let user = await User.findOne({ $or: [{ [field]:emailUser }] }).select(" -refreshToken -otp");
  if (!user) {
    return res
      .status(codes.notFound)
      .json(
        new ApiErrorResponse(
          "Account with credentials do not exist, try registering.",
          codes.notFound
        ).res()
      );
  }

  if (!user.comparePassword(password)) {
    return res
      .status(codes.conflict)
      .json(new ApiErrorResponse("Password mismatch.", codes.conflict).res());
  }

  let payload = { _id: user._id, userName: user.userName };
  const { accessToken, refreshToken } = tokens(payload);
  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("accessToken", accessToken, tokenOptions("access"));
  res.cookie("refreshToken", refreshToken, tokenOptions("refresh"));

  return res
    .status(codes.ok)
    .json(
      new ApiResponse(
        `Welcome back ${user.userName}. Logging you in.`,
        codes.ok,{user:user}
      ).res()
    );
});


/////////////////////////////////////////////////////////////
export const logout = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res
      .status(codes.unauthorized)
      .json(
        new ApiErrorResponse(
          "User not authorized, please login before.",
          codes.unauthorized
        ).res()
      );
  }

  let user = await User.findOne({
    $or: [{ userName: req.user.userName }, { _id: req.user._id }],
  });

  if (!user) {
    return res
      .status(codes.internalServerError)
      .json(
        new ApiErrorResponse("Error fetching the user.", codes.internalServerError).res()
      );
  }

  user.refreshToken = "";
  await user.save();

  for (let cookie in req.cookies) {
    res.clearCookie(cookie, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
  }

  return res
    .status(codes.ok)
    .json(
      new ApiResponse(`${req.user.userName} successfully logged out.`, codes.ok).res()
    );
});


///////////////////////////////////////////////

// export const updateProfile = asyncHandler(async (req, res) => {
//   if (!req.user) {
//     return res
//       .status(codes.unauthorized)
//       .json(
//         new ApiErrorResponse(
//           "User not authorized,please login before updating profile.",
//           codes.unauthorized
//         ).res()
//       );
//   }

//   const userId = req.user._id;

//   const {
//     firstName,
//     lastName,
//     occupation,
//     bio,
//     instagram,
//     facebook,
//     linkedin,
//     github,
//   } = req.body;
//   const file = req.file? req.file : "";

//   const fileUri = getDataUri(file);
//   let cloudResponse = await cloudinary.uploader.upload(fileUri);

//   const user = await User.findById(userId).select("-password -refreshToken -otp");

//   if (!user) {
//     return res
//       .status(codes.notFound)
//       .json(new ApiErrorResponse("Account not found.", codes.notFound).res());
//   }

//   // updating data
//   if (user.firstName !== firstName) user.firstName = firstName;
//   if (user.lastName !== lastName) user.lastName = lastName;
//   if (user.occupation !== occupation) user.occupation = occupation;
//   if (user.instagram !== instagram) user.instagram = instagram;
//   if (user.facebook !== facebook) user.facebook = facebook;
//   if (user.linkedin !== linkedin) user.linkedin = linkedin;
//   if (user.github !== github) user.github = github;
//   if (user.bio !== bio) user.bio = bio;
//   if (user.photoUrl == file) user.photoUrl = cloudResponse.secure_url;

//   await user.save();
//   return res
//     .status(codes.ok)
//     .json(new ApiResponse("User profile successfully updated", codes.ok,{user:user}).res());
// });

export const updateProfile = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res
      .status(codes.unauthorized)
      .json(
        new ApiErrorResponse(
          "User not authorized,please login before updating profile.",
          codes.unauthorized
        ).res()
      );
  }

  const userId = req.user._id;

  const {
    firstName,
    lastName,
    occupation,
    bio,
    instagram,
    facebook,
    linkedin,
    github,
  } = req.body;

  const user = await User.findById(userId).select("-password -refreshToken -otp");

  if (!user) {
    return res
      .status(codes.notFound)
      .json(new ApiErrorResponse("Account not found.", codes.notFound).res());
  }

  // Update fields if changed
  if (firstName && user.firstName !== firstName) {user.firstName = firstName;}
  if (lastName && user.lastName !== lastName) {user.lastName = lastName;}
  if (occupation && user.occupation !== occupation) {user.occupation = occupation.split(" ").map((e,i)=>e[0].toUpperCase()+e.slice(1)).join(" ");}
  if (bio && user.bio !== bio) {user.bio = bio;}
  if (instagram && user.instagram !== instagram) {user.instagram = instagram;}
  if (facebook && user.facebook !== facebook) {user.facebook = facebook;}
  if (linkedin && user.linkedin !== linkedin) {user.linkedin = linkedin;}
  if (github && user.github !== github) {user.github = github;}


  if (req.cloudinary?.url) {
    user.photoUrl = req.cloudinary.url;
  }

  await user.save();

  return res
    .status(codes.ok)
    .json(
      new ApiResponse(
        "User profile successfully updated",
        codes.ok,
        { user:user }
      ).res()
    );
});

///////////////////////////////////////////////////

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password -otp -refreshToken");
  // exclude password field
  return res.status(codes.ok).json(
    new ApiResponse("Users successfully found", codes.ok, {
      totalUsers: users?.length,
      users:users??[]
    }).res()
  );
});
