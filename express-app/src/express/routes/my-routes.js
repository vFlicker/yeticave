import { Router } from 'express';

import { defaultApi } from '../api.js';
import { lots } from '../mock.js';

export const myRouter = Router();

myRouter.get('/profile', async (req, res) => {
  const categories = await defaultApi.getCategories();
  res.render('pages/my/profile', { categories });
});

myRouter.get('/subscriptions', (req, res) => {
  res.render('pages/my/subscriptions');
});

myRouter.get('/watchlist', async (req, res) => {
  const categories = await defaultApi.getCategories();

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

myRouter.get('/my-bets', async (req, res) => {
  const categories = await defaultApi.getCategories();
  res.render('pages/my/my-bets', { categories });
});
