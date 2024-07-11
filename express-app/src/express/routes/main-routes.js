import { Router } from 'express';

export const mainRouter = Router();

mainRouter.get('/', (req, res) => {
  res.render('pages/index');
});

mainRouter.get('/login', (req, res) => {
  res.render('pages/auth/login');
});

mainRouter.get('/register', (req, res) => {
  res.render('pages/auth/sign-up');
});

mainRouter.get('/search', (req, res) => {
  res.render('pages/search-result');
});
