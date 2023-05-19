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

export class BetController extends BaseController {
  protected dirname = __dirname;

  public getMyBetsPage = async (req: Request, res: Response): Promise<void> => {
    const user = this.getSession(req, 'user');

    if (!user) {
      this.redirect(res, ROOT_PREFIX);
      return;
    }

    const betModel = this.modelFactoryService.getEmptyModel(BetModel);

    try {
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
    } catch (error) {
      this.renderError(res, error);
    }
  };
}
