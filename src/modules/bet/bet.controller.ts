import { Request, Response } from 'express';

import {
  formatPrice,
  getTimeAgo,
  getTimeLeft,
  isTimeFinished,
  isTimeFinishing,
  requireAuth,
  ROOT_PREFIX,
} from '../../common';
import { BaseController } from '../../framework';
import { BetModel } from './bet.model';

// TODO: add middleware for validation
export class BetController extends BaseController {
  protected dirname = __dirname;

  public getMyBetsPage = [
    requireAuth,
    async (req: Request, res: Response) => {
      const { user } = req.session;

      if (!user) return this.redirect(res, ROOT_PREFIX);

      const betModel = new BetModel();
      const bets = await betModel.getAllByUserId(user.id);

      this.render(res, 'myBetsPage', {
        pageTitle: 'My bets',
        bets,
        helper: {
          formatPrice,
          isTimeFinished,
          isTimeFinishing,
          getTimeLeft,
          getTimeAgo,
        },
      });
    },
  ];
}
