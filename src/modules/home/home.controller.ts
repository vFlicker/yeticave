import { Request, Response } from 'express';

import {
  formatPrice,
  getLotPath,
  getTimeLeft,
  isTimeFinishing,
} from '../../common';
import { BaseController, PaginatorService } from '../../framework';
import { LotModel } from '../lot';

export class HomeController extends BaseController {
  protected dirname = __dirname;

  public getHomePage = async (req: Request, res: Response): Promise<void> => {
    const currentPage = this.getCurrentPage(req);
    const uri = this.getUri(req);

    this.pageTitle = 'Home';

    const paginator = new PaginatorService(this.modelFactoryService, LotModel);

    try {
      await paginator
        .setUri(uri)
        .setItemsPerPage(6)
        .setCurrentPage(currentPage)
        .init('getUnfinished');

      const lots = paginator.getItems();

      this.render(res, 'homePage', {
        canShowTomMenu: false,
        paginator,
        lots,
        helper: {
          formatPrice,
          getTimeLeft,
          isTimeFinishing,
          getLotPath,
        },
      });
    } catch (error) {
      this.renderError(res, error);
    }
  };
}
