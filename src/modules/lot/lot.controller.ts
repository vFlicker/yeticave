import { Request, Response } from 'express';

import {
  formatPrice,
  getLotPath,
  getMinRate,
  getTimeAgo,
  getTimeLeft,
  isTimeFinishing,
  ValidationService,
} from '../../common';
import { BaseController } from '../../framework';
import { BetModel } from '../bet/bet.model';
import { LotModel } from './lot.model';
import { newBetSchema, newLotSchema } from './schemas';

// TODO: add middleware for validation
export class LotController extends BaseController {
  protected dirname = __dirname;

  public getLotPage = async (req: Request, res: Response): Promise<void> => {
    const id = this.getParam(req, 'id');

    // TODO: handle error
    const lotModel = await this.modelFactoryService.load(LotModel, id);
    const betModel = this.modelFactoryService.getEmptyModel(BetModel);

    const allBets = await betModel.getHistoryOfRatesByLotId(id);
    const maxPrice = await betModel.getMaxPriceByLotId(id);

    this.render(res, 'lotPage', {
      pageTitle: lotModel.title,
      bets: allBets,
      maxPrice,
      lot: lotModel,
      errors: [],
      hasErrors: false,
      helper: {
        formatPrice,
        getMinRate,
        getTimeAgo,
      },
    });
  };

  public sendNewBetForm = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    // TODO: use framework method
    const { body, params, session } = req;
    const { id: idParam } = params;

    const lotModel = await this.modelFactoryService.load(LotModel, idParam);
    const betModel = this.modelFactoryService.getEmptyModel(BetModel);
    const bets = await betModel.getHistoryOfRatesByLotId(idParam);
    const maxPrice = await betModel.getMaxPriceByLotId(idParam);

    const { id, price, step, title } = lotModel;

    // TODO: if (! && !) throw new Err
    if (id && price && step && title) {
      const minPrice = Math.max(price, maxPrice.price) + step;
      const formData = { ...body };

      const validation = new ValidationService(
        newBetSchema(minPrice),
        formData,
      ).validate();

      if (validation.hasErrors()) {
        return this.render(res, 'lotPage', {
          pageTitle: lotModel.title,
          bets,
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

      if (session.user) {
        const { user } = session;

        // TODO: handle errors
        const betData = {
          price: Number(formData.price),
          lotId: id,
          userId: user.id,
        };

        await betModel.createNew(betData);

        const path = `/lots/${id}`;
        this.redirect(res, path);
      }
    }
  };

  public getLotsByCategoryPage = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const name = this.getParam(req, 'name');

    const lotModel = this.modelFactoryService.getEmptyModel(LotModel);
    const lots = await lotModel.getLotsByCategory(
      name[0].toLocaleUpperCase() + name.slice(1),
    );

    // TODO: return page error
    // if (!lots) return res.status(404).send('what???');

    this.render(res, 'lotsByCategoryPage', {
      pageTitle: name,
      name,
      lots,
      helper: {
        formatPrice,
        getTimeLeft,
        isTimeFinishing,
        getLotPath,
      },
    });
  };

  public getNewLotPage = (_: Request, res: Response): void => {
    // use model
    const lot = {
      name: '',
      description: '',
      category: '',
      image: '',
      price: '',
      step: '',
      endDate: '',
    };

    this.render(res, 'newLotPage', {
      pageTitle: 'Add new lot',
      lot,
      errors: [],
      hasErrors: false,
      helper: {
        formatPrice,
        getMinRate,
      },
    });
  };

  public sendNewLotForm = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    // TODO: use framework methods
    const { body, file, session } = req;

    const imageData = file && { size: file?.size, mimetype: file?.mimetype };
    const formData = { ...body, imageUrl: imageData };

    const imageUrl = `/img/uploads/${file?.filename}`;
    const lot = { ...body, imageUrl };

    const validation = new ValidationService(newLotSchema, formData).validate();

    if (validation.hasErrors()) {
      return this.render(res, 'newLotPage', {
        pageTitle: 'Add new lot',
        lot,
        errors: validation.getErrors(),
        hasErrors: validation.hasErrors(),
        helper: {
          formatPrice,
          getMinRate,
        },
      });
    }

    if (session.user) {
      const { id } = session.user;
      const lotModel = this.modelFactoryService.getEmptyModel(LotModel);

      // TODO: handle errors
      const { id: lotId } = await lotModel.addLot(lot, id);

      const path = `/lots/${lotId}`;
      this.redirect(res, path);
    }
  };
}
