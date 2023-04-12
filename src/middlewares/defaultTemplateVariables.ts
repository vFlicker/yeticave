import { NextFunction, Request, Response } from 'express';

import { getLotCategoryPath } from '../common';
import { categories } from '../database';

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
