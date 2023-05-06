import { RequestHandler } from 'express';

import { BaseController } from '../base.controller';

type Route = {
  path: string;
  method: 'get' | 'post';
  className: typeof BaseController;
  action: string;
  middlewares?: RequestHandler[];
};

export type Router = Route[];
