import { Request, Response } from 'express';

import {
  formatPrice,
  getLotPath,
  getMinRate,
  getTimeLeft,
  getView,
  isTimeFinishing,
  lotHistoryCookie,
  requireAuth,
} from '../../common';
import { LotModel } from './lot.model';
import { createNewLotSchema } from './schemas';

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
    async (req: Request, res: Response) => {
      const { id } = req.params;

      const lotModel = new LotModel();
      const lot = await lotModel.getLotById(id);

      // TODO: page error
      if (!lot) return res.status(404).send('what???');

      res.render(getView(__dirname, 'lotPage'), {
        pageTitle: lot.title,
        lot,
        helper: {
          formatPrice,
          getMinRate,
        },
      });
    },
  ];

  public getLotsByCategoryPage = async (req: Request, res: Response) => {
    const { name } = req.params;

    const lotModel = new LotModel();
    const lots = await lotModel.getLotsByCategory(
      name[0].toLocaleUpperCase() + name.slice(1),
    );

    if (!lots) return res.status(404).send('what???');

    res.render(getView(__dirname, 'lotsByCategoryPage'), {
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

      res.render(getView(__dirname, 'newLotPage'), {
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

  public sendNewLotPageForm = async (req: Request, res: Response) => {
    const { body, file, session } = req;

    const errors = this.validateForm(body, file?.mimetype);
    const image = `/img/uploads/${file?.filename}`;
    const formData = { ...body, image };

    if (errors) {
      const hasErrors = Boolean(errors);

      return res.render(getView(__dirname, 'newLotPage'), {
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

      res.redirect(`/lots/${lotId}`);
    }
  };

  private validateForm(data: FormData, image?: string) {
    const formDataErrors = this.validateFormDate(data);
    const imageErrors = this.validateImage(image);

    const errors = { ...formDataErrors, ...imageErrors };

    if (Object.keys(errors).length > 0) return errors;
  }

  private validateFormDate(data: FormData) {
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
}
