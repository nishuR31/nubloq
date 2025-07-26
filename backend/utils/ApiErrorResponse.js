import codes from "../utils/codes.js";

export default class ApiErrorResponse extends Error {
  constructor(
    message = "Something broke.",
    code = codes.badRequest,
    payload = {},
    err = {}
  ) {
    super(err.message || message);
    this.code = code;
    this.payload = payload;
    this.success = false;
    this.stack = err.stack || Error.captureStackTrace(this, this.constructor);
  }
  res(dev = true) { 
    return { 
      message: this.message,
      success: this.success,
      code: this.code,
      payload: this.payload,
      stack: dev ? this.stack : null,
    };
  }
}
