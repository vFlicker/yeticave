import { NextFunction, Request, Response } from 'express';

import { CategoryModel } from '../../modules/category/category.model';
import { getLotCategoryPath } from '../utils';

export const defaultTemplateVariables = async (
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  const categoryModel = new CategoryModel();
  const categories = await categoryModel.getAllCategories();

  res.locals.canShowTomMenu = true;
  res.locals.categories = categories;
  res.locals.getLotCategoryPath = getLotCategoryPath;

  next();
};
