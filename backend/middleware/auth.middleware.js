import codes from "../utils/codes.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiErrorResponse from "../utils/ApiErrorResponse.js";
import { verifyAccess, verifyRefresh } from "../utils/tokenization.js";
import User from "../models/user.model.js";

let  auth = (need = true) =>
  asyncHandler(async (req, res, next) => {
    const accessToken = req.header.authorizatinon
      ? req.header.authorizatinon.split(" ")[1]
      : req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    
    req.user = null;

    if (!(accessToken || refreshToken)) {
      return need
        ? res
            .status(codes.unauthorized)
            .json(
              new ApiErrorResponse(
                "Auth tokens are not provided",
                codes.unauthorized
              ).res()
            )
        : next();
    }

    let decodedAccess, decodedRefresh;
    if (accessToken) {
      decodedAccess = verifyAccess(accessToken);
    }
    if (!decodedAccess) {
      return need
        ? res
            .status(codes.unauthorized)
            .json(
              new ApiErrorResponse(
                "Invalid access token",
                codes.unauthorized
              ).res()
            )
        : next();
    }

    if (refreshToken) {
      decodedRefresh = verifyRefresh(refreshToken);
    }
    if (!decodedRefresh) {
      return need
        ? res
            .status(codes.unauthorized)
            .json(
              new ApiErrorResponse(
                "Invalid refresh token",
                codes.unauthorized
              ).res()
            )
        : next();
    }

    if (decodedAccess._id !== decodedRefresh._id) {
      return need
        ? res
            .status(codes.unauthorized)
            .json(
              new ApiErrorResponse(
                "Auth tokens mismatch.",
                codes.unauthorized
              ).res()
            )
        : next();
    }

    let user = await User.findById(decodedAccess._id);

    let payload = { userName: user.userName, _id: user._id };

    req.user = payload || decodedAccess;
    next();
  });


  export default auth