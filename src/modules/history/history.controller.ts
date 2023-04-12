import { Request, Response } from 'express';

import {
  formatPrice,
  getLotPath,
  getTimeLeft,
  getView,
  isTimeFinishing,
  LOT_HISTORY_COOKIE_KEY,
} from '../../common';
import { lots } from '../../database';

export class HistoryController {
  public getHistoryPage = (req: Request, res: Response) => {
    const lotsSet = new Set(req.cookies[LOT_HISTORY_COOKIE_KEY]);
    const historyLots = lots.filter(({ id }) => lotsSet.has(id));

    res.render(getView(__dirname, 'historyPage'), {
      pageTitle: 'History',
      lots: historyLots,
      helper: {
        formatPrice,
        getTimeLeft,
        isTimeFinishing,
        getLotPath,
      },
    });
  };
}
