import { Router } from 'express';

import { HttpCode } from '../../constants.js';

const router = Router();

export const registerCategoryRoutes = (app) => {
  app.use('/categories', router);

  router.get('/', (req, res) => {
    res.status(HttpCode.OK);
    res.send({
      data: [
        {
          id: 1,
          name: 'Category 1',
        },
        {
          id: 2,
          name: 'Category 2',
        },
      ],
    });
  });
};
