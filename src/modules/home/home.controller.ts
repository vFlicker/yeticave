import { Request, Response } from 'express';

import {
  formatPrice,
  getLotPath,
  getTimeLeft,
  isTimeFinishing,
} from '../../common';
import { BaseController, PaginatorService } from '../../framework';
import { LotModel } from '../lot/lot.model';

export class HomeController extends BaseController {
  protected dirname = __dirname;

  public getHomePage = async (req: Request, res: Response): Promise<void> => {
    const page = this.getQuery<number | undefined>(req, 'page');
    const currentPage = page ? Number(page) : 1;

    const lotModel = this.modelFactoryService.getEmptyModel(LotModel);
    const paginator = new PaginatorService(this.modelFactoryService, lotModel);

    await paginator
      .setItemsPerPage(6)
      .setCurrentPage(currentPage)
      .init('getUnfinished');

    const lots = paginator.getItems();
    const pagesCount = paginator.getTotalPages();
    const pagesNumbers = paginator.getPagesNumbers();

    this.render(res, 'homePage', {
      pageTitle: 'Home',
      lots,
      canShowTomMenu: false,
      pages: pagesNumbers,
      pagesCount,
      lotsCount: paginator.getTotalResults(),
      currentPage,
      helper: {
        formatPrice,
        getTimeLeft,
        isTimeFinishing,
        getLotPath,
      },
    });
  };
}
