"use strict";

export const statusCode = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
};

export const message = {
  OK: "OK",
  CREATED: "Created",
  ACCEPTED: "Accepted",
};

export class SuccessResponse {
  constructor(message, code, data = null) {
    this.success = true;
    this.code = code;
    this.message = message;
    this.data = data;
  }

  send(res) {
    res.status(this.code).json({
      success: this.success,
      code: this.code,
      message: this.message,
      data: this.data,
    });
  }
}

export class OkSuccessResponse extends SuccessResponse {
  constructor(data = null) {
    super(message.OK, statusCode.OK, data);
  }
}

export class CreatedSuccessResponse extends SuccessResponse {
  constructor(data = null) {
    super(message.CREATED, statusCode.CREATED, data);
  }
}

export class AcceptedSuccessResponse extends SuccessResponse {
  constructor(data = null) {
    super(message.ACCEPTED, statusCode.ACCEPTED, data);
  }
}
