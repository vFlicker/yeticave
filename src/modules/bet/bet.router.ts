import { MY_BET_PAGE } from '../../common';
import { Router } from '../../framework';
import { BetController } from './bet.controller';

export const betRouter: Router = [
  {
    path: MY_BET_PAGE,
    method: 'get',
    className: BetController,
    action: 'getMyBetsPage',
  },
];
