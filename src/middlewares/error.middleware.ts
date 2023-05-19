import { NextFunction, Request, Response } from 'express';
import { EHTTPStatusCode, HttpException } from '@exceptions/httpException';
import { logger } from '@utils/logger';

export const ErrorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    const statusBoolean: boolean = error.status === EHTTPStatusCode.OK || error.status === EHTTPStatusCode.OK_CREATED;
    const message: string = error.message || 'Something went wrong';

    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
    res.status(status).json({ status: statusBoolean, message });
  } catch (error) {
    next(error);
  }
};
