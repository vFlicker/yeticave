import { Request, Response } from 'express';

import {
  BaseController,
  formatPrice,
  getLotPath,
  getTimeLeft,
  isTimeFinishing,
} from '../../common';
import { LotModel } from '../lot/lot.model';

const NUMBER_ITEMS_PER_PAGE = 3;

export class HomeController extends BaseController {
  protected dirname = __dirname;

  public getHomePage = async (req: Request, res: Response) => {
    const page = req.query.page as string;
    const currentPage = page ? Number(page) : 1;
    const offset = (currentPage - 1) * NUMBER_ITEMS_PER_PAGE;

    const lotModel = new LotModel();
    // TODO: user object instead value
    const lotCount = await lotModel.getUnfinishedLotsCount();
    const lots = await lotModel.getUnfinishedLots(
      NUMBER_ITEMS_PER_PAGE,
      offset,
    );

    const length = Math.ceil(Number(lotCount) / NUMBER_ITEMS_PER_PAGE);

    this.render(res, 'homePage', {
      pageTitle: 'Home',
      lots,
      canShowTomMenu: false,
      pages: Array.from({ length }, (_, index) => index + 1),
      pagesCount: length,
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
