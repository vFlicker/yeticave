import { Router } from 'express';

export const lotsRouter = Router();

lotsRouter.get('/categories/:id', (req, res) => {
  res.render('pages/lots/category');
});

lotsRouter.get('/add', (req, res) => {
  res.render('pages/lots/new-lot');
});

lotsRouter.get('/:id', (req, res) => {
  res.render('pages/lots/lot');
});
