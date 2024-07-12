import { Router } from 'express';

import { defaultApi } from '../api.js';
import { showPage404Middleware } from '../middlewares/show-page-404-middleware.js';

export const lotsRouter = Router();

lotsRouter.get('/categories/:id', async (req, res) => {
  const categoryId = Number.parseInt(req.params.id, 10);

  try {
    const [categories, currentCategory, lots] = await Promise.all([
      defaultApi.getCategories(),
      defaultApi.getCategory(categoryId),
      defaultApi.getLotsByCategory(categoryId),
    ]);

    res.render('pages/lots/category', {
      categories,
      category: currentCategory.name,
      lots,
    });
  } catch (error) {
    // TODO: fix this place
    showPage404Middleware(req, res);
  }
});

lotsRouter.get('/add', async (_req, res) => {
  const categories = await defaultApi.getCategories();
  res.render('pages/lots/new-lot', { categories });
});

lotsRouter.get('/:id', async (req, res) => {
  const lotId = Number.parseInt(req.params.id, 10);

  const [categories, lot] = await Promise.all([
    defaultApi.getCategories(),
    defaultApi.getLotById(lotId),
  ]);

  console.log(lot);

  res.render('pages/lots/lot', { categories, lot });
});
