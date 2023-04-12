import { Request, Response } from 'express';

// TODO: use injection
import {
  formatPrice,
  getLotPath,
  getTimeLeft,
  isTimeFinishing,
  LOT_HISTORY_COOKIE,
} from '../common';
// TODO: use injection
import { lots } from '../database';

export class HistoryController {
  public indexPage = (req: Request, res: Response) => {
    const lotsSet = new Set(req.cookies[LOT_HISTORY_COOKIE]);
    const historyLots = lots.filter(({ id }) => lotsSet.has(id));

    res.render('pages/history', {
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
