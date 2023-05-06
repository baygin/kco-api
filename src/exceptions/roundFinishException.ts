import { EHTTPStatusCode, HttpException } from './httpException';

export class RoundFinishException extends HttpException {
  protected static status: EHTTPStatusCode = EHTTPStatusCode.BAD_REQUEST;
  public message: string;

  constructor(message = 'Round finished!') {
    super(RoundFinishException.status, message);
  }
}
