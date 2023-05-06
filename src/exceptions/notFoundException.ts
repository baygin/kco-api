import { EHTTPStatusCode, HttpException } from './httpException';

export class NotFoundException extends HttpException {
  protected static status: EHTTPStatusCode = EHTTPStatusCode.NOT_FOUND;
  public message: string;

  constructor(message = 'There is no data found!') {
    super(NotFoundException.status, message);
  }
}
