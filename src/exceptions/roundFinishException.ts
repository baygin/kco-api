import { HttpException } from './httpException';
import { StatusCodes } from 'http-status-codes';

export class RoundFinishException extends HttpException {
  protected static status: number = StatusCodes.BAD_REQUEST;
  public message: string;

  constructor(message = 'Round finished!') {
    super(RoundFinishException.status, message);
  }
}
