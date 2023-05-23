import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { BaseController } from '../../framework';

export class _404Controller extends BaseController {
  protected dirname = __dirname;

  public getNotFoundPage = (_: Request, res: Response): void => {
    this.setStatusCode(res, StatusCodes.NOT_FOUND);

    this.render(res, 'notFoundPage', {
      pageTitle: 'Page not found',
    });
  };
}
