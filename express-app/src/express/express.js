import chalk from 'chalk';
import connectSessionSequelize from 'connect-session-sequelize';
import cookieParser from 'cookie-parser';
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import session from 'express-session';
import path from 'path';

import { ExitCode, FRONTEND_PORT, SESSION_SECRET } from '../constants.js';
import { sequelize } from '../service/lib/sequelize.js';
import { showPage404Middleware } from './middlewares/show-page-404-middleware.js';
import { showPage500Middleware } from './middlewares/show-page-500-middleware.js';
import { lotsRouter } from './routes/lots-routes.js';
import { mainRouter } from './routes/main-routes.js';
import { myRouter } from './routes/my-routes.js';
import { getDirname } from './utils/get-dirname.js';

const PUBLIC_DIR = 'public';
const UPLOAD_DIR = 'upload';
const TEMPLATES_DIR = 'templates';

const app = express();

const configureViewEngine = (app) => {
  app.set('view engine', 'ejs');
  app.set('views', path.resolve(import.meta.dirname, TEMPLATES_DIR));
  app.use(expressLayouts);
};

const configureStaticAssets = (app) => {
  const __dirname = getDirname(import.meta.url);
  app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
  app.use(express.static(path.resolve(__dirname, UPLOAD_DIR)));
};

const configureBodyParsers = (app) => {
  app.use(express.urlencoded({ extended: false }));
};

const configureSession = (app) => {
  const SequelizeStore = connectSessionSequelize(session.Store);

  const sessionStore = new SequelizeStore({
    db: sequelize,
    expiration: 180000,
    checkExpirationInterval: 60000,
  });

  sequelize.sync({ force: false });

  const sessionMiddleware = session({
    secret: SESSION_SECRET,
    store: sessionStore,
    resave: false,
    proxy: true,
    saveUninitialized: false,
  });

  app.use(sessionMiddleware);
};

const setupRoutes = (app) => {
  app.use(`/lots`, lotsRouter);
  app.use(`/my`, myRouter);
  app.use('/', mainRouter);
};

const configureErrorHandling = (app) => {
  app.use(showPage404Middleware);
  app.use(showPage500Middleware);
};

const onListeningHandler = () => {
  const url = `http://localhost:${FRONTEND_PORT}`;
  const text = `Front server is running on ${chalk.blueBright(url)}`;
  console.log(text);
};

const onErrorHandler = (err) => {
  console.error(chalk.red(`An error occurred: ${err.message}`));
  process.exit(ExitCode.ERROR);
};

configureViewEngine(app);
configureStaticAssets(app);
configureBodyParsers(app);
configureSession(app);
setupRoutes(app);
configureErrorHandling(app);

app
  .listen(FRONTEND_PORT)
  .on('listening', onListeningHandler)
  .on('error', onErrorHandler);
