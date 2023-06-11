import { HttpException } from './httpException';
import { StatusCodes } from 'http-status-codes';

export class InvalidArgumentException extends HttpException {
  protected static status: Number = StatusCodes.BAD_REQUEST;
  public message: string;

  constructor(message = 'Invalid argument!') {
    super(InvalidArgumentException.status, message);
  }
}
