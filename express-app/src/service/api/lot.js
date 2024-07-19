import { Router } from 'express';

import { HttpCode } from '../../constants.js';
import { lotValidator } from '../middlewares/lot-validator.js';
import { routeParamsValidation } from '../middlewares/route-params-validator.js';

export const registerLotRoutes = (app, lotService, commentService) => {
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
      const lots = await lotService.findAllByCategory(+categoryId);

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
    const lot = await lotService.findOne(+lotId);

    if (!lot) {
      res.status(HttpCode.NOT_FOUND);
      res.send(`Lot with id ${lotId} not found`);
      return;
    }

    res.status(HttpCode.OK);
    res.json(lot);
  });

  // TODO: add lotExist middleware
  router.get('/:lotId/comments', routeParamsValidation, async (req, res) => {
    const { lotId } = req.params;
    const comments = await commentService.findByLotId(+lotId);

    res.status(HttpCode.OK);
    res.json(comments);
  });

  router.post('/', lotValidator, async (req, res) => {
    const newLot = await lotService.create(req.body);
    res.status(HttpCode.CREATED);
    res.json(newLot);
  });

  // TODO: add lotExist middleware
  router.post('/:lotId/comments', async (req, res) => {
    const { lotId } = req.params;
    const { text } = req.body;

    const newComment = await commentService.create(1, +lotId, text);

    res.status(HttpCode.CREATED);
    res.json(newComment);
  });
};
