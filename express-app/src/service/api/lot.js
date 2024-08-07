import { Router } from 'express';

import { HttpCode } from '../../constants.js';
import { commentValidator } from '../middlewares/comment-validator.js';
import { lotExist } from '../middlewares/lot-exist.js';
import { lotValidator } from '../middlewares/lot-validator.js';
import { routeParamsValidation } from '../middlewares/route-params-validator.js';

export const registerLotRoutes = (app, lotService, commentService) => {
  const router = Router();

  app.use('/lots', router);

  router.get('/', async (req, res) => {
    const { limit, offset } = req.query;
    let lots;

    if (limit || offset) {
      lots = await lotService.findPage({ limit: +limit, offset: +offset });
    } else {
      lots = await lotService.findAll();
    }

    res.status(HttpCode.OK);
    res.json(lots);
  });

  router.post('/', lotValidator, async (req, res) => {
    const newLot = await lotService.create(req.body);
    const foundLot = await lotService.findOne(newLot.id);
    const socket = req.app.locals.io;
    socket.emit('lot:created', foundLot);
    res.status(HttpCode.CREATED).json(foundLot);
  });

  router.get(
    '/categories/:categoryId',
    routeParamsValidation,
    async (req, res) => {
      const { categoryId } = req.params;
      const lots = await lotService.findAllByCategory(+categoryId);

      if (lots.length === 0) {
        res.status(HttpCode.NOT_FOUND);
        res.json({ message: `Lots with category id ${categoryId} not found` });
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
      res.json({ message: `Lot with id ${lotId} not found` });
      return;
    }

    res.status(HttpCode.OK);
    res.json(lot);
  });

  router.get(
    '/:lotId/comments',
    [routeParamsValidation, lotExist(lotService)],
    async (req, res) => {
      const { lotId } = req.params;
      const comments = await commentService.findAllByLotId(+lotId);

      res.status(HttpCode.OK);
      res.json(comments);
    },
  );

  router.post(
    '/:lotId/comments',
    [routeParamsValidation, lotExist(lotService), commentValidator],
    async (req, res) => {
      const { lotId } = req.params;
      const { text } = req.body;

      const newComment = await commentService.create(1, +lotId, text);

      res.status(HttpCode.CREATED);
      res.json(newComment);
    },
  );
};
