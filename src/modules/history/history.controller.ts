import { Request, Response } from 'express';

import {
  formatPrice,
  getLotPath,
  getTimeLeft,
  isTimeFinishing,
  LOT_HISTORY_COOKIE_KEY,
} from '../../common';
import { BaseController } from '../../framework';
import { LotModel } from '../lot/lot.model';

export class HistoryController extends BaseController {
  protected dirname = __dirname;

  public getHistoryPage = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    // TODO: add framework method
    const ids = JSON.parse(req.cookies[LOT_HISTORY_COOKIE_KEY]);

    const lotModel = this.modelFactoryService.getEmptyModel(LotModel);
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
