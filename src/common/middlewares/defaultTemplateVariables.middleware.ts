import { NextFunction, Request, Response } from 'express';

import { ModelFactoryService } from '../../framework';
import { CategoryModel } from '../../modules/category';
import { DatabaseService } from '../services';
import { getLotCategoryPath } from '../utils';

export const defaultTemplateVariables = async (
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  const databaseService = DatabaseService.getInstance();
  const modelFactory = ModelFactoryService.getInstance(databaseService);
  const categoryModel = modelFactory.getEmptyModel(CategoryModel);
  const categories = await categoryModel.getAllCategories();

  res.locals.canShowTomMenu = true;
  res.locals.categories = categories;
  res.locals.getLotCategoryPath = getLotCategoryPath;

  next();
};
