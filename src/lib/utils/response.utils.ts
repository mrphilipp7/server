import { Response } from "express";

// status codes associated with each HTTP action
enum RESPONSE_STATUS {
  SUCCESS = 200,
  CREATED = 201,
  NOCONTENT = 204,
  BAD_REQUEST = 400,
  UN_AUTHORIZED = 401,
  PAYMENT_REQUIRES = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  GONE = 410,
  LARGE_ENTITY = 413,
  UN_SUPPORTED_MEDIA_TYPE = 415,
  UN_PROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUEST = 429,
  INTERNAL_SERVER_ERROR = 500,
}

function responseBody(res: Response, statusCode: RESPONSE_STATUS, data: any) {
  return res.status(statusCode).json(data);
}

export { responseBody, RESPONSE_STATUS };
