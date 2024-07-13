import chalk from 'chalk';
import express from 'express';

import { API_PREFIX, BACKEND_PORT, ExitCode } from '../../../constants.js';
import { apiRoutes } from '../../api/index.js';
import { getLogger } from '../../lib/logger.js';
import { logNotFoundMiddleware } from '../../middlewares/log-not-found-middleware.js';
import { logRequestMiddleware } from '../../middlewares/log-request-middleware.js';
import { logServerErrorMiddleware } from '../../middlewares/log-server-error-middleware.js';

const app = express();
const logger = getLogger({ name: 'api' });

app.use(express.json());
app.use(logRequestMiddleware(logger));
app.use(API_PREFIX, apiRoutes);
app.use(logNotFoundMiddleware(logger));
app.use(logServerErrorMiddleware(logger));

export const serverCommand = {
  name: '--server',

  execute(_args) {
    app
      .listen(BACKEND_PORT)
      .on('listening', onListeningHandler)
      .on('error', onErrorHandler);
  },
};

const onListeningHandler = () => {
  logger.info(chalk.blue(`Server started on http://localhost:${BACKEND_PORT}`));
};

const onErrorHandler = (err) => {
  logger.error(chalk.red(`An error occurred: ${err.message}`));
  process.exit(ExitCode.ERROR);
};
