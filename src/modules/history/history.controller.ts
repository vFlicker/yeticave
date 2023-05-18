import { Request, Response } from 'express';

import {
  formatPrice,
  getLotPath,
  getTimeLeft,
  isTimeFinishing,
  LOT_HISTORY_COOKIE_KEY,
} from '../../common';
import { BaseController, PaginatorService } from '../../framework';
import { LotModel } from '../lot';

export class HistoryController extends BaseController {
  protected dirname = __dirname;

  public getHistoryPage = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const ids = this.getCookie<string[]>(req, LOT_HISTORY_COOKIE_KEY);

    if (!ids.length) {
      this.render(res, 'emptyHistoryPage', { pageTitle: 'History' });
      return;
    }

    const currentPage = this.getCurrentPage(req);
    const uri = this.getUri(req);

    const lotModel = this.modelFactoryService.getEmptyModel(LotModel);
    const paginator = new PaginatorService(this.modelFactoryService, lotModel);

    await paginator
      .setUri(uri)
      .setItemsPerPage(6)
      .setCurrentPage(currentPage)
      .init('getLotsByIds', ids);

    const lots = paginator.getItems();

    this.render(res, 'historyPage', {
      pageTitle: 'History',
      lots,
      paginator,
      helper: {
        formatPrice,
        getTimeLeft,
        isTimeFinishing,
        getLotPath,
      },
    });
  };
}
