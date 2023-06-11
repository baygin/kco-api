import { HttpException } from './httpException';
import { StatusCodes } from 'http-status-codes';

export class yandexAPIKeyInvalidException extends HttpException {
  protected static status: number = StatusCodes.BAD_REQUEST;
  public message: string;

  constructor(message = 'Invalid Yandex API Key!') {
    super(yandexAPIKeyInvalidException.status, message);
  }
}
