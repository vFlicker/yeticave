import { Router } from 'express';

import { api } from '../api.js';
import { Paginator } from '../utils/paginator.js';

export const mainRouter = Router();

mainRouter.get('/', async (req, res) => {
  const uri = req.originalUrl;
  const { page } = req.query;

  const paginator = new Paginator(+page, 1);
  const { limit, offset } = paginator.getPagination();

  const [categories, data] = await Promise.all([
    api.getCategories(),
    api.getAllLots({ limit, offset }),
  ]);

  paginator.setData(data).setUri(uri);

  res.render('pages/index', {
    categories,
    lots: paginator.items,
    paginator: paginator,
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

mainRouter.get('/search', async (req, res) => {
  const { query } = req.query;

  const categories = await api.getCategories();

  try {
    const lots = await api.search(query);
    res.render('pages/search-result', { categories, lots });
  } catch (error) {
    res.render('pages/search-result', { categories, lots: [] });
  }
});
