import { Request, Response } from 'express';

import {
  formatPrice,
  getLotPath,
  getTimeLeft,
  getView,
  isTimeFinishing,
} from '../../common';
import { LotModel } from '../lot/lot.model';

export class HomeController {
  public getHomePage = async (_: Request, res: Response) => {
    const lotModel = new LotModel();
    const lots = await lotModel.getUnfinishedLots();

    res.render(getView(__dirname, 'homePage'), {
      pageTitle: 'Home',
      lots,
      canShowTomMenu: false,
      helper: {
        formatPrice,
        getTimeLeft,
        isTimeFinishing,
        getLotPath,
      },
    });
  };
}
