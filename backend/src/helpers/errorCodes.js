export const errorCodes = {
  // 400 - Bad Request
  BAD_REQUEST: {
    code: "E40001",
    httpCode: 400,
    message: "Bad request",
  },
  VALIDATION_ERROR: {
    code: "E40002",
    httpCode: 400,
    message: "Invalid input data",
  },
  TOKEN_EXPIRED: {
    code: "E40003",
    httpCode: 400,
    message: "Token has expired",
  },
  USER_EXISTS: {
    code: "E40004",
    httpCode: 400,
    message: "User already exists",
  },

  // 401 - Unauthorized
  UNAUTHORIZED: {
    code: "E40101",
    httpCode: 401,
    message: "Unauthorized access",
  },
  INVALID_TOKEN: {
    code: "E40102",
    httpCode: 401,
    message: "Invalid token",
  },

  // 403 - Forbidden
  FORBIDDEN: {
    code: "E40301",
    httpCode: 403,
    message: "Forbidden access",
  },

  // 404 - Not Found
  NOT_FOUND: {
    code: "E40401",
    httpCode: 404,
    message: "Resource not found",
  },
  INVALID_ROUTE: {
    code: "E40403",
    httpCode: 404,
    message: "Invalid API endpoint",
  },

  // 409 - Conflict
  DUPLICATE_RESOURCE: {
    code: "E40901",
    httpCode: 409,
    message: "Resource already exists",
  },

  // 500 - Internal Server Error
  INTERNAL_ERROR: {
    code: "E50001",
    httpCode: 500,
    message: "Internal server error",
  },
};
