import { Router } from 'express';

import { api } from '../api.js';
import { auth } from '../middlewares/auth.js';
import { showPage404Middleware } from '../middlewares/show-page-404-middleware.js';
import { upload } from '../middlewares/upload.js';
import { prepareErrors } from '../utils/prepare-errors.js';

export const lotsRouter = Router();

lotsRouter.get('/categories/:id', async (req, res) => {
  const categoryId = +req.params.id;

  try {
    const { user } = req.session;
    const [categories, currentCategory, lots] = await Promise.all([
      api.getCategories(),
      api.getCategory(categoryId),
      api.getLotsByCategory(categoryId),
    ]);

    res.render('pages/lots/category', {
      user,
      categories,
      category: currentCategory.name,
      lots,
    });
  } catch (error) {
    // TODO: fix this place
    showPage404Middleware(req, res);
  }
});

lotsRouter.get('/add', auth, async (req, res) => {
  const { user } = req.session;
  const categories = await api.getCategories();
  res.render('pages/lots/new-lot', { user, categories, errors: [] });
});

lotsRouter.post(
  '/add',
  [auth, upload.single('lot-photo')],
  async (req, res) => {
    const { body, file } = req;

    const lotData = {
      title: body.title,
      description: body.description,
      imageUrl: file ? file.filename : '',
      startingPrice: body.startingPrice,
      currentPrice: body.startingPrice,
      finishedAt: body.finishedAt,
      categoryId: body.categoryId,
      userId: 1,
    };

    const categories = await api.getCategories();

    try {
      await api.createLot(lotData);
      res.redirect('/');
    } catch (error) {
      const { user } = req.session;
      res.render('pages/lots/new-lot', {
        user,
        categories,
        errors: prepareErrors(error),
      });
    }
  },
);

lotsRouter.get('/:id', async (req, res) => {
  const lotId = +req.params.id;
  const { user } = req.session;

  const [categories, lot, comments] = await Promise.all([
    api.getCategories(),
    api.getLotById(lotId),
    api.getCommentsByLotId(lotId),
  ]);

  res.render('pages/lots/lot', { user, categories, lot, comments });
});
