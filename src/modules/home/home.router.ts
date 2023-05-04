import { Router } from '../../app';
import { ROOT_PREFIX } from '../../common';
import { HomeController } from './home.controller';

export const homeRouter: Router = [
  {
    path: ROOT_PREFIX,
    method: 'get',
    className: HomeController,
    action: 'getHomePage',
  },
];
