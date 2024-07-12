import { Router } from 'express';

import { defaultApi } from '../api.js';

export const myRouter = Router();

myRouter.get('/profile', async (_req, res) => {
  const categories = await defaultApi.getCategories();
  res.render('pages/my/profile', { categories });
});

myRouter.get('/subscriptions', (_req, res) => {
  res.render('pages/my/subscriptions');
});

myRouter.get('/watchlist', async (_req, res) => {
  const [categories, lots] = await Promise.all([
    defaultApi.getCategories(),
    defaultApi.getAllLots(),
  ]);

  res.render('pages/index', {
    categories,
    lots,
  });

  res.render('pages/my/watchlist', { categories, lots });
});

myRouter.get('/bets', async (_req, res) => {
  const categories = await defaultApi.getCategories();
  res.render('pages/my/my-bets', { categories });
});
