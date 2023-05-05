import { Router } from '../../framework';
import { HISTORY_PAGE } from '../../common';
import { HistoryController } from './history.controller';

export const historyRouter: Router = [
  {
    path: HISTORY_PAGE,
    method: 'get',
    className: HistoryController,
    action: 'getHistoryPage',
  },
];
