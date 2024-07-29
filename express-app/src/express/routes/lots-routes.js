import { Router } from 'express';

import { api } from '../api.js';
import { showPage404Middleware } from '../middlewares/show-page-404-middleware.js';
import { upload } from '../middlewares/upload.js';

export const lotsRouter = Router();

lotsRouter.get('/categories/:id', async (req, res) => {
  const categoryId = +req.params.id;

  try {
    const [categories, currentCategory, lots] = await Promise.all([
      api.getCategories(),
      api.getCategory(categoryId),
      api.getLotsByCategory(categoryId),
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
  const categories = await api.getCategories();
  res.render('pages/lots/new-lot', { categories });
});

lotsRouter.post('/add', upload.single('lot-photo'), async (req, res) => {
  const { body, file } = req;

  const lotData = {
    title: body.title,
    description: body.description,
    imageUrl: file.filename,
    startingPrice: body.startingPrice,
    currentPrice: body.startingPrice,
    finishedAt: body.finishedAt,
    categoryId: body.categoryId,
    userId: 1,
  };

  try {
    await api.createLot(lotData);
  } catch (error) {
    console.error('Error creating lot', error);
  }
});

lotsRouter.get('/:id', async (req, res) => {
  const lotId = +req.params.id;

  const [categories, lot, comments] = await Promise.all([
    api.getCategories(),
    api.getLotById(lotId),
    api.getCommentsByLotId(lotId),
  ]);

  res.render('pages/lots/lot', { categories, lot, comments });
});
