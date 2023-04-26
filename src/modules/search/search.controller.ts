import { RequestHandler, Response } from 'express';

import {
  formatPrice,
  getLotPath,
  getTimeLeft,
  getView,
  isTimeFinishing,
} from '../../common';
import { LotModel } from '../lot/lot.model';

type ReqQuery = {
  text: string;
};

// TODO: add middleware for validation query
export class SearchController {
  public getSearchPage: RequestHandler<any, any, any, ReqQuery> = async (
    req,
    res: Response,
  ) => {
    const lotModel = new LotModel();
    const lots = await lotModel.getLotsByText(req.query.text);

    res.render(getView(__dirname, 'searchPage'), {
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
