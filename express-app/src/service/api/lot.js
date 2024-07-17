import { Router } from 'express';

import { HttpCode } from '../../constants.js';
import { routeParamsValidation } from '../middlewares/route-params-validator.js';

export const registerLotRoutes = (app, lotService) => {
  const router = Router();

  app.use('/lots', router);

  router.get('/', async (_req, res) => {
    const lots = await lotService.findAll();
    res.status(HttpCode.OK);
    res.json(lots);
  });

  router.get(
    '/categories/:categoryId',
    routeParamsValidation,
    async (req, res) => {
      const { categoryId } = req.params;
      const lots = await lotService.findAllByCategory(
        Number.parseInt(categoryId, 10),
      );

      if (lots.length === 0) {
        res.status(HttpCode.NOT_FOUND);
        res.send(`Lots with category id ${categoryId} not found`);
        return;
      }

      res.status(HttpCode.OK);
      res.json(lots);
    },
  );

  router.get('/:lotId', routeParamsValidation, async (req, res) => {
    const { lotId } = req.params;
    const lot = await lotService.findOne(Number.parseInt(lotId, 10));

    if (!lot) {
      res.status(HttpCode.NOT_FOUND);
      res.send(`Lot with id ${lotId} not found`);
      return;
    }

    res.status(HttpCode.OK);
    res.json(lot);
  });

  // TODO: add body validation
  router.post('/', async (req, res) => {
    const newLot = await lotService.create(req.body);
    res.status(HttpCode.CREATED);
    res.json(newLot);
  });
};
