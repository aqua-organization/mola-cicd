import { errorCodes } from "../helpers/errorCodes.js";

export class ErrorResponse extends Error {
  constructor(message, statusCode, errorCode) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}

export class BadRequestError extends ErrorResponse {
  constructor(
    message = errorCodes.BAD_REQUEST.message,
    statusCode = errorCodes.BAD_REQUEST.httpCode,
    errorCode = errorCodes.BAD_REQUEST.code
  ) {
    super(message, statusCode, errorCode);
  }
}

export class UnauthorizedError extends ErrorResponse {
  constructor(
    message = errorCodes.UNAUTHORIZED.message,
    statusCode = errorCodes.UNAUTHORIZED.httpCode,
    errorCode = errorCodes.UNAUTHORIZED.code
  ) {
    super(message, statusCode, errorCode);
  }
}

export class NotFoundError extends ErrorResponse {
  constructor(
    message = errorCodes.NOT_FOUND.message,
    statusCode = errorCodes.NOT_FOUND.httpCode,
    errorCode = errorCodes.NOT_FOUND.code
  ) {
    super(message, statusCode, errorCode);
  }
}

export class InvalidRouteError extends ErrorResponse {
  constructor(
    message = errorCodes.INVALID_ROUTE.message,
    statusCode = errorCodes.INVALID_ROUTE.httpCode,
    errorCode = errorCodes.INVALID_ROUTE.code
  ) {
    super(message, statusCode, errorCode);
  }
}
