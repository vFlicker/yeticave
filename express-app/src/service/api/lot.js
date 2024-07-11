import { Router } from 'express';

import { HttpCode } from '../../constants.js';

export const registerLotRoutes = (app, lotService) => {
  const router = Router();

  app.use('/lots', router);

  router.get('/', (req, res) => {
    const lots = lotService.findAll();
    console.log(lots);
    res.status(HttpCode.OK);
    res.json(lots);
  });

  router.get('/:id', (req, res) => {
    const { id } = req.params;
    const lot = lotService.findOne(Number.parseInt(id, 10));

    if (!lot) {
      res.status(HttpCode.NOT_FOUND);
      res.send(`Lot with id ${id} not found`);
      return;
    }

    res.status(HttpCode.OK);
    res.json(lot);
  });

  router.post('/', (req, res) => {
    const lot = req.body;
    const newLot = lotService.create(lot);
    res.status(HttpCode.CREATED);
    res.json(newLot);
  });
};
