import { HttpException } from './httpException';
import { StatusCodes } from 'http-status-codes';

export class NotFoundException extends HttpException {
  protected static status: Number = StatusCodes.NOT_FOUND;
  public message: string;

  constructor(message = 'There is no data found!') {
    super(NotFoundException.status, message);
  }
}
