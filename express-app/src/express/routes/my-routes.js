import { Router } from 'express';

import { api } from '../api.js';
import { auth } from '../middlewares/auth.js';

export const myRouter = Router();

myRouter.use(auth);

myRouter.get('/profile', async (req, res) => {
  const { user } = req.session;
  const categories = await api.getCategories();
  res.render('pages/my/profile', { user, categories });
});

myRouter.get('/subscriptions', async (req, res) => {
  const { user } = req.session;
  const categories = await api.getCategories();
  res.render('pages/my/subscriptions', { user, categories });
});

myRouter.get('/watchlist', async (req, res) => {
  const { user } = req.session;
  const [categories, lots] = await Promise.all([
    api.getCategories(),
    api.getAllLots(),
  ]);

  res.render('pages/my/watchlist', {
    user,
    categories,
    lots,
  });
});

myRouter.get('/bets', async (req, res) => {
  const { user } = req.session;
  const categories = await api.getCategories();
  res.render('pages/my/my-bets', { user, categories });
});
