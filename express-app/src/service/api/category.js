import { Router } from 'express';

import { HttpCode } from '../../constants.js';

export const registerCategoryRoutes = (app, categoryService) => {
  const router = Router();

  app.use('/categories', router);

  router.get('/', async (_req, res) => {
    const categories = await categoryService.findAll();
    res.status(HttpCode.OK);
    res.json(categories);
  });

  router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const category = await categoryService.findById(Number.parseInt(id, 10));

    if (!category) {
      res.status(HttpCode.NOT_FOUND);
      res.json({});
      return;
    }

    res.status(HttpCode.OK);
    res.json(category);
  });
};
