import { Router } from 'express';

import { HttpCode } from '../../constants.js';

export const registerCategoryRoutes = (app, data) => {
  const router = Router();

  app.use('/categories', router);

  router.get('/', (req, res) => {
    res.status(HttpCode.OK);
    res.send(data.categories);
  });
};
