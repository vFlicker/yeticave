import { BaseController } from '../base.controller';

type Route = {
  path: string;
  method: 'get' | 'post';
  className: typeof BaseController;
  action: string;
};

export type Router = Route[];
