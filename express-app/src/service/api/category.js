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
};
