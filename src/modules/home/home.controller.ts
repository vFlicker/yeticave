import { Request, Response } from 'express';

import {
  formatPrice,
  getLotPath,
  getTimeLeft,
  getView,
  isTimeFinishing,
  lots,
} from '../../common';

export class HomeController {
  public getHomePage = (_: Request, res: Response) => {
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
