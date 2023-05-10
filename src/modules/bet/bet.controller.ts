import { Request, Response } from 'express';

import {
  formatPrice,
  getTimeAgo,
  getTimeLeft,
  isTimeFinished,
  isTimeFinishing,
  ROOT_PREFIX,
} from '../../common';
import { BaseController } from '../../framework';
import { BetModel } from './bet.model';

// TODO: add middleware for validation
export class BetController extends BaseController {
  protected dirname = __dirname;

  public getMyBetsPage = async (req: Request, res: Response) => {
    const { user } = req.session;

    if (!user) return this.redirect(res, ROOT_PREFIX);

    const betModel = this.modelFactoryService.getEmptyModel(BetModel);
    const bets = await betModel.getBetsForUser(user.id);

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
  };
}
