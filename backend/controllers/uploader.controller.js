import asyncHandler from "../utils/asyncHandler.js";
import ApiErrorResponse from "../utils/ApiErrorResponse.js";
import ApiResponse from "../utils/ApiResponse.js";
import codes from "../utils/codes.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploader = asyncHandler(async (req, res,next) => {
  const file = req.files?.file; // name="file" in form/input

  if (!file || Array.isArray(file)) {return next()
  }

  // Upload to Cloudinary using the temp path
  const result = await cloudinary.uploader.upload(file.tempFilePath, {
    folder: "my_uploads", // optional
    resource_type: "auto", // auto-detect image/video
  });

  if (!result) {
    return res
      .status(codes.internalServerError)
      .json(
        new ApiErrorResponse(
          "Image uploadation failed.",
          codes.internalServerError
        ).res()
      );
  }
  // Optional: Delete local temp file after upload
  fs.unlinkSync(file.tempFilePath);

  req.cloudinary = {
    url: result.secure_url,
    public_id: result.public_id,
  };

  next(); // move on to your profile update controller
});

export default uploader;
