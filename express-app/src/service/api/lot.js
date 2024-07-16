import { Router } from 'express';

import { HttpCode } from '../../constants.js';

export const registerLotRoutes = (app, lotService) => {
  const router = Router();

  app.use('/lots', router);

  router.get('/', async (_req, res) => {
    const lots = await lotService.findAll();
    res.status(HttpCode.OK);
    res.json(lots);
  });

  router.get('/categories/:id', async (req, res) => {
    const { id } = req.params;
    const lots = await lotService.findAllByCategory(Number.parseInt(id, 10));

    if (lots.length === 0) {
      res.status(HttpCode.NOT_FOUND);
      res.send(`Lots with category id ${id} not found`);
      return;
    }

    res.status(HttpCode.OK);
    res.json(lots);
  });

  router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const lot = await lotService.findOne(Number.parseInt(id, 10));

    if (!lot) {
      res.status(HttpCode.NOT_FOUND);
      res.send(`Lot with id ${id} not found`);
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
