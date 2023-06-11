import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/httpException';
import { logger } from '@utils/logger';
import { StatusCodes } from 'http-status-codes';

export const ErrorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
    const statusBoolean: boolean = error.status === StatusCodes.OK || error.status === StatusCodes.CREATED;
    const message: string = error.message || 'Something went wrong';

    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
    res.status(status).json({ status: statusBoolean, message });
  } catch (error) {
    next(error);
  }
};
