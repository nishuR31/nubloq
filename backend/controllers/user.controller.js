import User from "../models/user.model.js";

import ApiErrorResponse from "../utils/ApiErrorResponse.js";
import ApiResponse from "../utils/ApiResponse.js";
import codes from "../utils/codes.js";
import hideEmail from "../utils/hideEmail.js";
import isEmpty from "../utils/isEmpty.js";
import { tokens } from "../utils/tokenization.js";
import cookieOptions from "../utils/cookieOptions.js";
import asyncHandler from "../utils/asyncHandler.js";
import Blog from "../models/blog.model.js";
import mongoose from "mongoose";

export const register = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, userName } = req.body;
  if (isEmpty([email, password, userName])) {
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
    userName,
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
    return res.status(codes.ok).json(
      new ApiResponse("User already logged in.", codes.ok, {
        user: { _id: req.user._id, userName: req.user.userName },
      }).res()
    );
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
  const field = emailRegex.test(emailUser) ? "email" : "userName";

  let user = await User.findOne({ $or: [{ [field]: emailUser }] });
  // let user = await User.findOne({ $or: [{ [field]: emailUser }] }).select(" -refreshToken -otp ");
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

  // res.cookie("accessToken", accessToken, {    httpOnly: true,
  //   secure: true, // ✅ Needed for HTTPS (Vercel + Render are HTTPS)
  //   sameSite: "None", // ✅ Needed for cross-site cookies
  //   path: "/", // ✅ Required to be available across the app
  //   maxAge: 1000 * 60 * 60 * 24 * 1});
  res.cookie("accessToken", accessToken, cookieOptions("access"));
  // res.cookie("refreshToken", refreshToken, {    httpOnly: true,
  //   secure: true, // ✅ Needed for HTTPS (Vercel + Render are HTTPS)
  //   sameSite: "None", // ✅ Needed for cross-site cookies
  //   path: "/", // ✅ Required to be available across the app
  //   maxAge: 1000 * 60 * 60 * 24 * 1});
  res.cookie("refreshToken", refreshToken, cookieOptions("refresh"));

  return res.status(codes.ok).json(
    new ApiResponse(
      `Welcome back ${user.userName}. Logging you in.`,
      codes.ok,
      {
        user: {
          _id: user._id,
          userName: user.userName,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          bio: user.bio,
          occupation: user.occupation,
          photoUrl: user.photoUrl,
          instagram: user.instagram,
          linkedin: user.linkedin,
          github: user.github,
          facebook: user.facebook,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          bookMark: user.bookMark,
        },
        accessToken: accessToken,
      }
    ).res()
  );
});

//////////////////////////////////////////////////////////////

export const bookMark = asyncHandler(async (req, res) => {
const blogId = req.params.blogId;
const q = req.query.q === "true";
console.log(q);

if (!req.user) {
  return res.status(codes.unauthorized).json(
    new ApiErrorResponse("Cannot bookmark without login.", codes.unauthorized).res()
  );
}

if (!blogId || !mongoose.Types.ObjectId.isValid(blogId)) {
  return res.status(codes.badRequest).json(
    new ApiErrorResponse("Invalid blog post ID.", codes.badRequest).res()
  );
}

const user = await User.findById(req.user._id);
if (!user) {
  return res.status(codes.notFound).json(
    new ApiErrorResponse("Invalid user.", codes.notFound).res()
  );
}

const blog = await Blog.findById(blogId);
if (!blog) {
  return res.status(codes.notFound).json(
    new ApiErrorResponse("Invalid blog.", codes.notFound).res()
  );
}

// ✅ Check if bookmarked using .some() and .equals()
const isBookmarked = user.bookMark.some((id) => id!=blogId);

// ✅ Toggle logic
if (q) {
  if (isBookmarked) {
    user.bookMark = user.bookMark.filter((id) => id!=blogId);
  } else {
    user.bookMark.push(blog._id);
  }
} else {
  if (isBookmarked) {
    user.bookMark = user.bookMark.filter((id) => id!=blogId);
  } else {
    user.bookMark.push(blog._id);
  }
}

// ✅ Save updated user
await user.save();

// ✅ Response
return res.status(codes.ok).json(
  new ApiResponse(`Bookmark updated for user ${user.userName}`, codes.ok, {
    bookMark: user.bookMark,
  }).res()
);
})
////////////////////////////////////////////////////////////////////////////

export const profile = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let user = await User.findById(id);
  if (!user) {
    return res
      .status(codes.notFound)
      .json(new ApiErrorResponse("No user found.", codes.notFound).res());
  }
  return res.status(codes.ok).json(
    new ApiResponse(`User ${user.userName} found successfully.`, codes.ok, {
      user: {
        _id: user._id,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        bio: user.bio,
        occupation: user.occupation,
        photoUrl: user.photoUrl,
        instagram: user.instagram,
        linkedin: user.linkedin,
        github: user.github,
        facebook: user.facebook,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        bookMark: user.bookMark,
      },
    }).res()
  );
});
/////////////////////////////////////////////////////////////
export const logout = asyncHandler(async (req, res) => {
  // if (!req.user) {
  //   return res
  //     .status(codes.unauthorized)
  //     .json(
  //       new ApiErrorResponse(
  //         "User not authorized, please login before.",
  //         codes.unauthorized
  //       ).res()
  //     );
  // }

  // let user = await User.findOne({
  //   $or: [{ userName: req.user.userName }, { _id: req.user._id }],
  // });

  // if (!user) {
  //   return res
  //     .status(codes.internalServerError)
  //     .json(
  //       new ApiErrorResponse(
  //         "Error fetching the user.",
  //         codes.internalServerError
  //       ).res()
  //     );
  // }
  // if (!req.user) {
  //   return res
  //     .status(codes.unauthorized)
  //     .json(
  //       new ApiErrorResponse(
  //         "User not authorized, please login before.",
  //         codes.unauthorized
  //       ).res()
  //     );
  // }

  // let user = await User.findOne({
  //   $or: [{ userName: req.user.userName }, { _id: req.user._id }],
  // });

  // if (!user) {
  //   return res
  //     .status(codes.internalServerError)
  //     .json(
  //       new ApiErrorResponse(
  //         "Error fetching the user.",
  //         codes.internalServerError
  //       ).res()
  //     );
  // }

  user.refreshToken = "";
  await user.save();
  // req.user=null;

  // for (let cookie in req.cookies) {
  //   res.clearCookie(cookie, {
  //     httpOnly: false,
  //     secure: true,
  //     sameSite: "None",
  //     path:"/",
  //   });
  // }

      res.clearCookie("accessToken", {
      httpOnly: false,
      secure: true,
      sameSite: "None",
      path: "/",
    });
    res.clearCookie("refreshToken", {
      httpOnly: false,
      secure: true,
      sameSite: "None",
      path: "/",
    });
  
  return res
    .status(codes.ok)
    .json(
      new ApiResponse(
        `You are successfully logged out.`,
        codes.ok
      ).res()
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

  let {
    firstName,
    email,
    lastName,
    occupation,
    bio,
    facebook,
    linkedin,
    github,
    instagram,
  } = req.body;

  const user = await User.findById(req.user._id).select(
    "-password -refreshToken -otp"
  );

  if (!req.user._id) {
    return res
      .status(codes.notFound)
      .json(
        new ApiErrorResponse("User Account not found.", codes.notFound).res()
      );
  }

  // Update fields if changed
  if (firstName && user.firstName !== firstName) {
    user.firstName = firstName;
  }
  if (email && user.email !== email) {
    user.email = email;
  }
  if (lastName !== undefined && user.lastName !== lastName) {
    user.lastName = lastName;
  }
  if (occupation !== undefined && user.occupation !== occupation) {
    user.occupation = occupation
      ? occupation
          .split(" ")
          .map((e, i) => e[0].toUpperCase() + e.slice(1))
          .join(" ")
      : "";
  }
  if (bio !== undefined && user.bio !== bio) {
    user.bio = bio;
  }
  if (instagram !== undefined && user.instagram !== instagram) {
    user.instagram = instagram;
  }
  if (facebook !== undefined && user.facebook !== facebook) {
    user.facebook = facebook;
  }
  if (linkedin !== undefined && user.linkedin !== linkedin) {
    user.linkedin = linkedin;
  }
  if (github !== undefined && user.github !== github) {
    user.github = github;
  }

  if (req.file?.url !== undefined && user.photoUrl !== req.file.url) {
    user.photoUrl = req.file.url;
  }

  await user.save();

  return res.status(codes.ok).json(
    new ApiResponse("User profile successfully updated", codes.ok, {
      user: user,
    }).res()
  );
});

///////////////////////////////////////////////////

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password -otp -refreshToken");
  // exclude password field
  return res.status(codes.ok).json(
    new ApiResponse("Users successfully found", codes.ok, {
      totalUsers: users?.length,
      users: users ?? [],
    }).res()
  );
});
