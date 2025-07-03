import { InvalidRouteError } from "../cores/error.response.js";
import { errorCodes } from "../helpers/errorCodes.js";

export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const errorHandler = (err, req, res, next) => {
  console.error(`[Error] ${err.message}`);

  const statusCode = err.statusCode || errorCodes.INTERNAL_ERROR.httpCode;
  const code = err.errorCode || errorCodes.INTERNAL_ERROR.code;
  const message = err.message || errorCodes.INTERNAL_ERROR.message;

  return res.status(statusCode).json({
    success: false,
    code,
    message,
  });
};

export const notFoundHandler = (req, res, next) => {
  next(new InvalidRouteError());
};
