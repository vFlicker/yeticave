import { MY_BET_PAGE, requireAuth } from '../../common';
import { Router } from '../../framework';
import { BetController } from './bet.controller';

export const betRouter: Router = [
  {
    path: MY_BET_PAGE,
    method: 'get',
    className: BetController,
    action: 'getMyBetsPage',
    middlewares: [requireAuth],
  },
];
