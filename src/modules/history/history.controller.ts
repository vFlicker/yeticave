import { Request, Response } from 'express';

import {
  BaseController,
  formatPrice,
  getLotPath,
  getTimeLeft,
  isTimeFinishing,
  LOT_HISTORY_COOKIE_KEY,
} from '../../common';
import { LotModel } from '../lot/lot.model';

export class HistoryController extends BaseController {
  protected dirname = __dirname;

  public getHistoryPage = async (req: Request, res: Response) => {
    const ids = JSON.parse(req.cookies[LOT_HISTORY_COOKIE_KEY]);

    const lotModel = new LotModel();
    const lots = await lotModel.getLotsByIds(ids);

    this.render(res, 'historyPage', {
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
