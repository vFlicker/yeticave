import { Router } from 'express';

import { HttpCode } from '../../constants.js';
import { routeParamsValidation } from '../middlewares/route-params-validator.js';

export const registerCategoryRoutes = (app, categoryService) => {
  const router = Router();

  app.use('/categories', router);

  router.get('/', async (_req, res) => {
    const categories = await categoryService.findAll();
    res.status(HttpCode.OK);
    res.json(categories);
  });

  router.get('/count', async (_req, res) => {
    const categories = await categoryService.findAllWithCount();
    res.status(HttpCode.OK);
    res.json(categories);
  });

  router.get('/:categoryId', routeParamsValidation, async (req, res) => {
    const { categoryId } = req.params;

    const category = await categoryService.findById(+categoryId);

    if (!category) {
      res.status(HttpCode.NOT_FOUND);
      res.json({});
      return;
    }

    res.status(HttpCode.OK);
    res.json(category);
  });
};
