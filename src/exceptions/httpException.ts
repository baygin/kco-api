export enum EHTTPStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERVAL_SERVER = 500,
  CONFLICT = 409,
}

export class HttpException extends Error {
  public status: EHTTPStatusCode;
  public message: string;

  constructor(status: EHTTPStatusCode, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}