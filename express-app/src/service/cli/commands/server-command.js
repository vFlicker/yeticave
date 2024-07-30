import chalk from 'chalk';
import express from 'express';
import { createServer } from 'http';

import { API_PREFIX, BACKEND_PORT, ExitCode } from '../../../constants.js';
import { apiRoutes } from '../../api/api-routes.js';
import { checkDatabaseConnect } from '../../lib/check-database-connect.js';
import { getLogger } from '../../lib/logger.js';
import { sequelize } from '../../lib/sequelize.js';
import { socket } from '../../lib/socket.js';
import { logNotFoundMiddleware } from '../../middlewares/log-not-found-middleware.js';
import { logRequestMiddleware } from '../../middlewares/log-request-middleware.js';
import { logServerErrorMiddleware } from '../../middlewares/log-server-error-middleware.js';

const app = express();
const server = createServer(app);

const io = socket(server);
app.locals.io = io;

const logger = getLogger({ name: 'api' });

app.use(express.json());
app.use(logRequestMiddleware(logger));
app.use(API_PREFIX, apiRoutes);
app.use(logNotFoundMiddleware(logger));
app.use(logServerErrorMiddleware(logger));

export const serverCommand = {
  name: '--server',

  async execute(_args) {
    await checkDatabaseConnect(sequelize, logger);

    io.on('connection', onSocketConnectionHandler);

    server
      .listen(BACKEND_PORT)
      .on('listening', onListeningHandler)
      .on('error', onErrorHandler);
  },
};

const onSocketConnectionHandler = (socket) => {
  logger.info(chalk.blue('A user connected'));
  socket.on('disconnect', () => {
    logger.info(chalk.blue('A user disconnected'));
  });
};

const onListeningHandler = () => {
  logger.info(chalk.blue(`Server started on http://localhost:${BACKEND_PORT}`));
};

const onErrorHandler = (err) => {
  logger.error(chalk.red(`An error occurred: ${err.message}`));
  process.exit(ExitCode.ERROR);
};
