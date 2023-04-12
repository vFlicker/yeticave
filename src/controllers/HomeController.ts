import { Request, Response } from 'express';

// TODO: use injection
import {
  formatPrice,
  getLotPath,
  getTimeLeft,
  isTimeFinishing,
} from '../common';
// TODO: use injection
import { lots } from '../database';

export class HomeController {
  public indexPage = (_: Request, res: Response) => {
    res.render('pages/home', {
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
