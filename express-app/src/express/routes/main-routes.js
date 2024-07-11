import { Router } from 'express';

import { defaultApi } from '../api.js';
import { lots } from '../mock.js';

export const mainRouter = Router();

mainRouter.get('/', async (req, res) => {
  const categories = await defaultApi.getCategories();

  const resolverLots = lots.map((lot) => {
    const result = {
      ...lot,
      category: categories.find((category) => category.id === lot.categoryId),
    };

    delete result.categoryId;

    return result;
  });

  res.render('pages/index', { categories, lots: resolverLots });
});

mainRouter.get('/login', async (req, res) => {
  const categories = await defaultApi.getCategories();
  res.render('pages/auth/login', { categories });
});

mainRouter.get('/register', async (req, res) => {
  const categories = await defaultApi.getCategories();
  res.render('pages/auth/sign-up', { categories });
});

mainRouter.get('/search', async (req, res) => {
  const categories = await defaultApi.getCategories();

  const resolverLots = lots.map((lot) => {
    const result = {
      ...lot,
      category: categories.find((category) => category.id === lot.categoryId),
    };

    delete result.categoryId;

    return result;
  });

  res.render('pages/search-result', { categories, lots: resolverLots });
});
