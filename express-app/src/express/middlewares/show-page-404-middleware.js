import { HttpCode } from '../../constants.js';

export const showPage404Middleware = (_req, res, _next) => {
  res.status(HttpCode.NOT_FOUND).render('pages/errors/404', {
    layout: 'error-layout',
  });
};
