import { Router } from 'express';

import { bids, categories, comments, lots, users } from '../mock.js';

export const lotsRouter = Router();

lotsRouter.get('/categories/:id', (req, res) => {
  const categoryId = Number.parseInt(req.params.id, 10);
  const currentCategory = categories.find(({ id }) => id === categoryId);

  const resolverLots = [];
  for (const lot of lots) {
    if (lot.categoryId === categoryId) {
      const result = {
        ...lot,
        category: currentCategory,
      };

      delete result.categoryId;

      resolverLots.push(result);
    }
  }

  res.render('pages/lots/category', {
    categories,
    category: currentCategory.name,
    lots: resolverLots,
  });
});

lotsRouter.get('/add', (req, res) => {
  res.render('pages/lots/new-lot', { categories });
});

lotsRouter.get('/:id', (req, res) => {
  const lotId = Number.parseInt(req.params.id, 10);
  const lot = lots.find(({ id }) => id === lotId);

  const resolvedLot = {
    ...lot,
    category: categories.find(({ id }) => id === lot.categoryId),
    bids: bids
      .filter(({ lotId }) => lotId === lot.id)
      .map((bid) => ({
        ...bid,
        user: users.find(({ id }) => id === bid.userId),
      })),
    comments: comments
      .filter(({ lotId }) => lotId === lot.id)
      .map((comment) => ({
        ...comment,
        user: users.find(({ id }) => id === comment.userId),
      })),
  };

  res.render('pages/lots/lot', { categories, lot: resolvedLot });
});
