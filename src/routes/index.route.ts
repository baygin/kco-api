import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { IndexController } from '@controllers/index.controller';
import controllerErrorMiddleware from '@/middlewares/controller-error.middleware';

export class IndexRoute implements Routes {
  public path = '/';
  public router = Router();
  public index = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, controllerErrorMiddleware(this.index.index));
  }
}
