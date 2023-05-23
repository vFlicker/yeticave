import { Request, Response } from 'express';

import {
  formatPrice,
  getLotPath,
  getTimeLeft,
  isTimeFinishing,
} from '../../common';
import { BaseController } from '../../framework';
import { LotModel } from '../lot/lot.model';

export class SearchController extends BaseController {
  protected dirname = __dirname;

  public getSearchPage = async (req: Request, res: Response): Promise<void> => {
    const searchText = this.getQuery<string>(req, 'text');

    const lotModel = this.modelFactoryService.getEmptyModel(LotModel);

    try {
      const lots = await lotModel.getLotsByText(searchText);

      this.render(res, 'searchPage', {
        pageTitle: 'Found lots',
        search: searchText,
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
}
