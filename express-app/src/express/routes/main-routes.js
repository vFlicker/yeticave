import { Router } from 'express';

import { categories, lots } from '../mock.js';

export const mainRouter = Router();

mainRouter.get('/', (req, res) => {
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

mainRouter.get('/login', (req, res) => {
  res.render('pages/auth/login', { categories });
});

mainRouter.get('/register', (req, res) => {
  res.render('pages/auth/sign-up', { categories });
});

mainRouter.get('/search', (req, res) => {
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
