import { Router } from 'express';

import { api } from '../api.js';

export const myRouter = Router();

myRouter.get('/profile', async (_req, res) => {
  const categories = await api.getCategories();
  res.render('pages/my/profile', { categories });
});

myRouter.get('/subscriptions', async (_req, res) => {
  const categories = await api.getCategories();
  res.render('pages/my/subscriptions', { categories });
});

myRouter.get('/watchlist', async (_req, res) => {
  const [categories, lots] = await Promise.all([
    api.getCategories(),
    api.getAllLots(),
  ]);

  res.render('pages/my/watchlist', {
    categories,
    lots,
  });
});

myRouter.get('/bets', async (_req, res) => {
  const categories = await api.getCategories();
  res.render('pages/my/my-bets', { categories });
});
