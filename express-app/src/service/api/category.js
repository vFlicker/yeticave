import { Router } from 'express';

import { HttpCode } from '../../constants.js';

export const registerCategoryRoutes = (app, categoryService) => {
  const router = Router();

  app.use('/categories', router);

  router.get('/', (req, res) => {
    const categories = categoryService.findAll();
    res.status(HttpCode.OK);
    res.json(categories);
  });

  router.get('/:id', (req, res) => {
    const { id } = req.params;
    const category = categoryService.findById(Number.parseInt(id, 10));

    if (!category) {
      res.status(HttpCode.NOT_FOUND);
      res.json({});
      return;
    }

    res.status(HttpCode.OK);
    res.json(category);
  });
};
