import { Request, Response } from 'express';

export class IndexController {
  public index = async (req: Request, res: Response) => {
    res.status(201).json({ status: true, message: 'Everything is great :)' });
  };
}
