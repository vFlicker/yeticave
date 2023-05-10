import { RequestHandler, Response } from 'express';

import {
  formatPrice,
  getLotPath,
  getTimeLeft,
  isTimeFinishing,
} from '../../common';
import { BaseController } from '../../framework';
import { LotModel } from '../lot/lot.model';

type ReqQuery = {
  text: string;
};

// TODO: add middleware for validation query
export class SearchController extends BaseController {
  protected dirname = __dirname;

  // TODO: Typed params
  public getSearchPage: RequestHandler<any, any, any, ReqQuery> = async (
    req,
    res: Response,
  ) => {
    const lotModel = this.modelFactoryService.getEmptyModel(LotModel);
    const lots = await lotModel.getLotsByText(req.query.text);

    this.render(res, 'searchPage', {
      pageTitle: 'Find lot',
      search: req.query.text,
      lots,
      helper: {
        formatPrice,
        getTimeLeft,
        isTimeFinishing,
        getLotPath,
      },
    });
  };
}
