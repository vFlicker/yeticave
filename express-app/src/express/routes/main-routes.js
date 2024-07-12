import { Router } from 'express';

import { api } from '../api.js';

export const mainRouter = Router();

mainRouter.get('/', async (_req, res) => {
  const [categories, lots] = await Promise.all([
    api.getCategories(),
    api.getAllLots(),
  ]);

  res.render('pages/index', {
    categories,
    lots,
  });
});

mainRouter.get('/login', async (_req, res) => {
  const categories = await api.getCategories();
  res.render('pages/auth/login', { categories });
});

mainRouter.get('/register', async (_req, res) => {
  const categories = await api.getCategories();
  res.render('pages/auth/sign-up', { categories });
});

mainRouter.get('/search', async (_req, res) => {
  const [categories, lots] = await Promise.all([
    api.getCategories(),
    api.getAllLots(),
  ]);

  res.render('pages/search-result', { categories, lots });
});
