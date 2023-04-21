import { Request, Response } from 'express';

import {
  formatPrice,
  getLotPath,
  getTimeLeft,
  getView,
  isTimeFinishing,
  LOT_HISTORY_COOKIE_KEY,
} from '../../common';
import { LotModel } from '../lot/lot.model';

export class HistoryController {
  public getHistoryPage = async (req: Request, res: Response) => {
    const ids = JSON.parse(req.cookies[LOT_HISTORY_COOKIE_KEY]);

    const lotModel = new LotModel();
    const lots = await lotModel.getLotsByIds(ids);

    res.render(getView(__dirname, 'historyPage'), {
      pageTitle: 'History',
      lots,
      helper: {
        formatPrice,
        getTimeLeft,
        isTimeFinishing,
        getLotPath,
      },
    });
  };
}
