import { NextFunction, Request, Response } from 'express';

import { categories } from '../../database';
import { getLotCategoryPath } from '../utils';

export const defaultTemplateVariables = (
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  res.locals.canShowTomMenu = true;
  res.locals.categories = categories;
  res.locals.getLotCategoryPath = getLotCategoryPath;

  next();
};
