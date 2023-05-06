import { EHTTPStatusCode, HttpException } from './httpException';

export class InvalidArgumentException extends HttpException {
  protected static status: EHTTPStatusCode = EHTTPStatusCode.BAD_REQUEST;
  public message: string;

  constructor(message = 'Invalid argument!') {
    super(InvalidArgumentException.status, message);
  }
}
