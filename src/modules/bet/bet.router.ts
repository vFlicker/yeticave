import { CREATE_NEW_BET, MY_BETS_PAGE, requireAuth } from '../../common';
import { Router } from '../../framework';
import { BetController } from './bet.controller';

export const betRouter: Router = [
  {
    path: MY_BETS_PAGE,
    method: 'get',
    className: BetController,
    action: 'getMyBetsPage',
    middlewares: [requireAuth],
  },
  {
    path: CREATE_NEW_BET,
    method: 'post',
    className: BetController,
    action: 'createNewBet',
  },
];
