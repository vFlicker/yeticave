import { Request, Response } from 'express';

import {
  formatPrice,
  getLotPath,
  getMinRate,
  getTimeAgo,
  getTimeLeft,
  isTimeFinishing,
} from '../../common';
import {
  BaseController,
  PaginatorService,
  ValidationService,
} from '../../framework';
import { BetModel } from '../bet/bet.model';
import { CreateLot } from './interfaces';
import { LotModel } from './lot.model';
import { newLotSchema } from './schemas';

export class LotController extends BaseController {
  protected dirname = __dirname;

  public getLotPage = async (req: Request, res: Response): Promise<void> => {
    const user = this.getSession(req, 'user');
    const id = this.getParam(req, 'id');

    const betModel = this.modelFactoryService.getEmptyModel(BetModel);

    const lotModelPromise = this.modelFactoryService.load(LotModel, id);
    const allBetsPromise = betModel.getHistoryOfRatesByLotId(id);
    const maxPricePromise = betModel.getMaxPriceByLotId(id);

    try {
      const [lotModel, allBets, maxPrice] = await Promise.all([
        lotModelPromise,
        allBetsPromise,
        maxPricePromise,
      ]);

      this.pageTitle = lotModel.title;

      const isShowBetForm = user && user.id !== lotModel.userId;

      this.render(res, 'lotPage', {
        bets: allBets,
        maxPrice: maxPrice,
        lot: lotModel,
        isShowBetForm,
        errors: [],
        hasErrors: false,
        helper: {
          formatPrice,
          getMinRate,
          getTimeAgo,
        },
      });
    } catch (error) {
      this.renderError(res, error);
    }
  };

  public getLotsByCategoryPage = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const currentPage = this.getCurrentPage(req);
    const uri = this.getUri(req);
    const name = this.getParam(req, 'name');
    const categoryName = `${name[0].toLocaleUpperCase()}${name.slice(1)}`;

    this.pageTitle = name;

    const paginator = new PaginatorService(this.modelFactoryService, LotModel);

    try {
      await paginator
        .setUri(uri)
        .setItemsPerPage(6)
        .setCurrentPage(currentPage)
        .init('getLotsByCategory', [categoryName]);

      const lots = paginator.getItems();

      this.render(res, 'lotsByCategoryPage', {
        name,
        paginator,
        lots,
        helper: {
          formatPrice,
          getTimeLeft,
          isTimeFinishing,
          getLotPath,
        },
      });
    } catch (error) {
      this.renderError(res, error);
    }
  };

  public getNewLotPage = (_: Request, res: Response): void => {
    const lotModel = this.modelFactoryService.getEmptyModel(LotModel);

    this.pageTitle = 'Add new lot';

    this.render(res, 'newLotPage', {
      lot: lotModel,
      validation: null,
      helper: {
        formatPrice,
        getMinRate,
      },
    });
  };

  public createNewLot = async (req: Request, res: Response): Promise<void> => {
    const body = this.getBody<Omit<CreateLot, 'imageUrl'>>(req);
    const file = this.getFile(req);
    const user = this.getSession(req, 'user');

    this.pageTitle = 'Add new lot';

    const image = file && { size: file?.size, mimetype: file?.mimetype };

    const validation = new ValidationService(newLotSchema, {
      ...body,
      image,
    }).validate();

    const lot = { ...body, imageUrl: `/img/uploads/${file?.filename}` };

    if (validation.hasErrors()) {
      return this.render(res, 'newLotPage', {
        // TODO: use lotModel
        lot,
        validation,
        helper: {
          formatPrice,
          getMinRate,
        },
      });
    }

    if (user) {
      const { id } = user;
      const lotModel = this.modelFactoryService.getEmptyModel(LotModel);

      try {
        const { id: lotId } = await lotModel.addLot(lot, id);

        const path = `/lots/${lotId}`;
        this.redirect(res, path);
      } catch (error) {
        this.renderError(res, error);
      }
    }
  };
}
