import { Request, Response } from 'express';

import {
  formatPrice,
  getLotPath,
  getMinRate,
  getTimeAgo,
  getTimeLeft,
  isTimeFinishing,
  lotHistoryCookie,
  requireAuth,
} from '../../common';
import { BaseController } from '../../framework';
import { BetModel } from '../bet/bet.model';
import { LotModel } from './lot.model';
import { createNewBetSchema, createNewLotSchema } from './schemas';

type FormData = {
  name: string;
  category: string;
  description: string;
  price: number;
  step: number;
  endDate: string;
};

// TODO: add middleware for validation
export class LotController extends BaseController {
  protected dirname = __dirname;

  public getLotPage = [
    lotHistoryCookie,
    async (req: Request, res: Response) => {
      const id = this.getParam(req, 'id');

      const lotModel = new LotModel();
      const betModel = new BetModel();
      const lot = await lotModel.getLotById(id);
      const allBets = await betModel.getAllByLotId(id);
      const maxPrice = await betModel.getMaxPriceByLotId(id);

      // TODO: page error
      if (!lot) return res.status(404).send('what???');

      this.render(res, 'lotPage', {
        pageTitle: lot.title,
        bets: allBets,
        maxPrice,
        lot,
        errors: [],
        hasErrors: false,
        helper: {
          formatPrice,
          getMinRate,
          getTimeAgo,
        },
      });
    },
  ];

  public sendNewBetForm = async (req: Request, res: Response) => {
    const { body, params, session } = req;
    const { id } = params;

    const lotModel = new LotModel();
    const betModel = new BetModel();
    const lot = await lotModel.getLotById(id);
    const allBets = await betModel.getAllByLotId(id);
    const maxPrice = await betModel.getMaxPriceByLotId(id);

    const formData = { ...body };

    const minPrice = Math.max(lot.price, maxPrice) + lot.step;
    const errors = this.validateBetForm(formData, minPrice);

    if (errors) {
      const hasErrors = Boolean(errors);

      return this.render(res, 'lotPage', {
        pageTitle: lot.title,
        bets: allBets,
        maxPrice,
        lot,
        errors,
        hasErrors,
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
        lotId: lot.id,
        userId: user.id,
      };

      await betModel.addNew(betData);

      const path = `/lots/${lot.id}`;
      this.redirect(res, path);
    }
  };

  public getLotsByCategoryPage = async (req: Request, res: Response) => {
    const name = this.getParam(req, 'name');

    const lotModel = new LotModel();
    const lots = await lotModel.getLotsByCategory(
      name[0].toLocaleUpperCase() + name.slice(1),
    );

    if (!lots) return res.status(404).send('what???');

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

  public getNewLotPage = [
    requireAuth,
    (_: Request, res: Response) => {
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
    },
  ];

  public sendNewLotForm = async (req: Request, res: Response) => {
    const { body, file, session } = req;

    const errors = this.validateForm(body, file?.mimetype);
    const image = `/img/uploads/${file?.filename}`;
    const formData = { ...body, image };

    if (errors) {
      const hasErrors = Boolean(errors);

      return this.render(res, 'newLotPage', {
        pageTitle: 'Add new lot',
        lot: formData,
        errors,
        hasErrors,
        helper: {
          formatPrice,
          getMinRate,
        },
      });
    }

    const lotModel = new LotModel();

    if (session.user) {
      const { id } = session.user;

      // TODO: handle errors
      const lotId = await lotModel.addLot(formData, id);

      const path = `/lots/${lotId}`;
      this.redirect(res, path);
    }
  };

  private validateForm(data: FormData, image?: string) {
    const formDataErrors = this.validateNewLotFormDate(data);
    const imageErrors = this.validateImage(image);

    const errors = { ...formDataErrors, ...imageErrors };

    if (Object.keys(errors).length > 0) return errors;
  }

  private validateNewLotFormDate(data: FormData) {
    const schema = createNewLotSchema();
    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      const errors: Record<string, string> = {};

      error.details.forEach((detail) => {
        errors[detail.context!.key!] = detail.message;
      });

      return errors;
    }
  }

  private validateImage(mimetype = '') {
    const imageMimeTypes = ['image/jpeg', 'image/png'];

    if (imageMimeTypes.indexOf(mimetype) === -1) {
      return { image: 'Invalid image, must be a jpg, jpeg or png image' };
    }
  }

  private validateBetForm(data: FormData, minPrice = 1000) {
    const schema = createNewBetSchema(minPrice);
    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      const errors: Record<string, string> = {};

      error.details.forEach((detail) => {
        errors[detail.context!.key!] = detail.message;
      });

      return errors;
    }
  }
}
