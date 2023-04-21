import { Request, Response } from 'express';
import Joi from 'joi';

import {
  categories,
  DatabaseService,
  formatPrice,
  getLotPath,
  getMinRate,
  getTimeLeft,
  getView,
  isTimeFinishing,
  lotHistoryCookie,
  lots,
  requireAuth,
} from '../../common';

type FormData = {
  name: string;
  category: string;
  description: string;
  price: number;
  step: number;
  endDate: string;
};

// TODO: add middleware for validation
export class LotController {
  public getLotPage = [
    lotHistoryCookie,
    (req: Request, res: Response) => {
      const { id } = req.params;
      const index = Number(id) - 1;
      const lot = lots[index];

      if (!lot) return res.status(404).send('what???');

      res.render(getView(__dirname, 'lotPage'), {
        pageTitle: lot.title,
        categories,
        lot,
        helper: {
          formatPrice,
          getMinRate,
        },
      });
    },
  ];

  public getLotsByCategoryPage = (req: Request, res: Response) => {
    const { name } = req.params;
    const filteredLots = lots.filter(({ category }) => {
      return category.name.toLowerCase() === name;
    });

    if (!filteredLots) return res.status(404).send('what???');

    res.render(getView(__dirname, 'lotsByCategoryPage'), {
      pageTitle: name,
      name,
      lots: filteredLots,
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

      res.render(getView(__dirname, 'newLotPage'), {
        pageTitle: 'Add new lot',
        categories,
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

  public sendNewLotPageForm = (req: Request, res: Response) => {
    const { body, file } = req;

    const errors = this.validateForm(body, file?.mimetype);
    const image = `/img/uploads/${file?.filename}`;
    const lot = { ...body, image };

    if (errors) {
      const hasErrors = Boolean(errors);

      return res.render(getView(__dirname, 'newLotPage'), {
        pageTitle: 'Add new lot',
        categories,
        lot,
        errors,
        hasErrors,
        helper: {
          formatPrice,
          getMinRate,
        },
      });
    }

    // TODO: remove it
    lot.id = Date.now();

    // TODO: add res.redirect('/lots/:id')
    res.render(getView(__dirname, 'lotPage'), {
      pageTitle: lot.title,
      categories,
      lot,
      helper: {
        formatPrice,
        getMinRate,
      },
    });
  };

  private validateForm(data: FormData, image?: string) {
    const formDataErrors = this.validateFormDate(data);
    const imageErrors = this.validateImage(image);

    const errors = { ...formDataErrors, ...imageErrors };

    if (Object.keys(errors).length > 0) return errors;
  }

  private validateFormDate(data: FormData) {
    const schema = Joi.object({
      name: Joi.string().min(3).max(255).required(),
      category: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().min(1).required(),
      step: Joi.number().min(1).required(),
      endDate: Joi.date().iso().greater('now'),
    });

    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      const errors: Record<string, string> = {};

      error.details.forEach((detail) => {
        errors[detail.context!.key!] = detail.message;
      });

      return errors;
    }
  }

  private validateImage(mimetype?: string) {
    const imageMimeTypes = ['image/jpeg', 'image/png'];

    if (!mimetype || !imageMimeTypes.indexOf(mimetype)) {
      return { image: 'Invalid image, must be a jpg, jpeg or png image' };
    }
  }
}
