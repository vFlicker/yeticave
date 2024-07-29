import { Router } from 'express';

import { api } from '../api.js';
import { Paginator } from '../utils/paginator.js';
import { prepareErrors } from '../utils/prepare-errors.js';

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
  res.render('pages/auth/login', { categories, errors: [] });
});

mainRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const categories = await api.getCategories();

  try {
    const user = await api.auth({ email, password });
    req.session.user = user;
    req.session.save(() => res.redirect('/'));
  } catch (errors) {
    res.render('pages/auth/login', {
      categories,
      errors: prepareErrors(errors),
    });
  }
});

mainRouter.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

mainRouter.get('/register', async (_req, res) => {
  const categories = await api.getCategories();
  res.render('pages/auth/sign-up', { categories, errors: [] });
});

mainRouter.post('/register', async (req, res) => {
  const { username, email, password, passwordConfirm } = req.body;
  const categories = await api.getCategories();

  try {
    await api.createUser({ username, email, password, passwordConfirm });
    res.redirect('/login');
  } catch (errors) {
    res.render('pages/auth/sign-up', {
      categories,
      errors: prepareErrors(errors),
    });
  }
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
