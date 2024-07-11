import chalk from 'chalk';

import { HttpCode } from '../../constants.js';

export const showPage500Middleware = (err, _req, res, _next) => {
  console.error(chalk.red(err.stack));
  res.status(HttpCode.INTERNAL_SERVER_ERROR).render('pages/errors/500', {
    layout: 'error-layout',
  });
};
