import { Request, Response } from 'express';

import {
  formatPrice,
  getTimeAgo,
  getTimeLeft,
  getView,
  isTimeFinished,
  isTimeFinishing,
  requireAuth,
  ROOT_PREFIX,
} from '../../common';
import { BetModel } from './bet.model';

// TODO: add middleware for validation
export class BetController {
  public getMyBetsPage = [
    requireAuth,
    async (req: Request, res: Response) => {
      const { user } = req.session;

      if (!user) return res.redirect(ROOT_PREFIX);

      const betModel = new BetModel();
      const bets = await betModel.getAllByUserId(user.id);

      res.render(getView(__dirname, 'myBetsPage'), {
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
