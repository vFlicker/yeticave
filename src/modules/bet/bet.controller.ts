import { Request, Response } from 'express';

import {
  formatPrice,
  getMinRate,
  getTimeAgo,
  getTimeLeft,
  isTimeFinished,
  isTimeFinishing,
  ROOT_PREFIX,
  ValidationService,
} from '../../common';
import { BaseController } from '../../framework';
import { LotModel } from '../lot';
import { BetModel } from './bet.model';
import { CreateBet } from './interfaces';
import { newBetSchema } from './schemas';

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

  public createNewBet = async (req: Request, res: Response): Promise<void> => {
    const body = this.getBody<Omit<CreateBet, 'id'>>(req);
    const user = this.getSession(req, 'user');
    const idParam = this.getParam(req, 'id');

    const betModel = this.modelFactoryService.getEmptyModel(BetModel);

    const lotModelPromise = this.modelFactoryService.load(LotModel, idParam);
    const allBetsPromise = betModel.getHistoryOfRatesByLotId(idParam);
    const maxPricePromise = betModel.getMaxPriceByLotId(idParam);

    try {
      const [lotModel, allBets, maxPrice] = await Promise.all([
        lotModelPromise,
        allBetsPromise,
        maxPricePromise,
      ]);

      const { id, price, step, title } = lotModel;

      if (!id || !price || !step || !title) return;

      const minPrice = Math.max(price, maxPrice.price) + step;

      const validation = new ValidationService(
        newBetSchema(minPrice),
        body,
      ).validate();

      if (validation.hasErrors()) {
        return this.render(res, 'lotPage', {
          pageTitle: lotModel.title,
          bets: allBets,
          maxPrice,
          lot: lotModel,
          errors: validation.getErrors(),
          hasErrors: validation.hasErrors(),
          helper: {
            formatPrice,
            getMinRate,
            getTimeAgo,
          },
        });
      }

      if (user) {
        const betData = {
          price: Number(body.price),
          lotId: id,
          userId: user.id,
        };

        await betModel.createNew(betData);

        const path = `/lots/${id}`;
        this.redirect(res, path);
      }
    } catch (error) {
      this.renderError(res, error);
    }
  };
}
