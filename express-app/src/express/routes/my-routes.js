import { Router } from 'express';

import { categories, lots } from '../mock.js';

export const myRouter = Router();

myRouter.get('/profile', (req, res) => {
  res.render('pages/my/profile');
});

myRouter.get('/subscriptions', (req, res) => {
  res.render('pages/my/subscriptions');
});

myRouter.get('/watchlist', (req, res) => {
  const resolverLots = lots.map((lot) => {
    const result = {
      ...lot,
      category: categories.find((category) => category.id === lot.categoryId),
    };

    delete result.categoryId;

    return result;
  });

  res.render('pages/my/watchlist', { categories, lots: resolverLots });
});

myRouter.get('/my-bets', (req, res) => {
  res.render('pages/my/my-bets');
});
