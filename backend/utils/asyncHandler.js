import ApiErrorResponse from "./ApiErrorResponse.js";
import codes from "./codes.js";

let asyncHandler = (func) => async (req, res, next) => {
  try {
    return await func(req, res, next);
  } catch (err) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse(
          `Error occured : ${err.message || err}`,
          codes.badRequest,
          {},
          err
        ).res()
      );
  }
};

export default asyncHandler;
