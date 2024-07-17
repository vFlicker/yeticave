import { Router } from 'express';
import multer from 'multer';
import { nanoid } from 'nanoid';
import path from 'path';
import { fileURLToPath } from 'url';

import { api } from '../api.js';
import { showPage404Middleware } from '../middlewares/show-page-404-middleware.js';

const UPLOAD_DIR = `../upload/img`;

// TODO: We have the same code in express.js
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (_req, file, cb) => {
    const uniqueName = nanoid(10);
    const extension = file.originalname.split('.').pop();
    cb(null, `${uniqueName}.${extension}`);
  },
});

const upload = multer({ storage });

export const lotsRouter = Router();

lotsRouter.get('/categories/:id', async (req, res) => {
  const categoryId = Number.parseInt(req.params.id, 10);

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
    console.log('Successfully created lot');
  } catch (error) {
    console.error('Error creating lot', error);
  }
});

lotsRouter.get('/:id', async (req, res) => {
  const lotId = Number.parseInt(req.params.id, 10);

  const [categories, lot] = await Promise.all([
    api.getCategories(),
    api.getLotById(lotId),
  ]);

  res.render('pages/lots/lot', { categories, lot });
});
