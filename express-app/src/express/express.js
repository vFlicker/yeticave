import chalk from 'chalk';
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';

import { ExitCode, FRONTEND_PORT } from '../constants.js';
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

const __dirname = getDirname(import.meta.url);

app.set('view engine', 'ejs');
app.set('views', path.resolve(import.meta.dirname, TEMPLATES_DIR));
app.use(expressLayouts);

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
app.use(express.static(path.resolve(__dirname, UPLOAD_DIR)));

app.use(express.urlencoded({ extended: false }));

app.use(`/lots`, lotsRouter);
app.use(`/my`, myRouter);
app.use('/', mainRouter);

app.use(showPage404Middleware);
app.use(showPage500Middleware);

const onListeningHandler = () => {
  const url = `http://localhost:${FRONTEND_PORT}`;
  const text = `Front server is running on ${chalk.blueBright(url)}`;
  console.log(text);
};

const onErrorHandler = (err) => {
  console.error(chalk.red(`An error occurred: ${err.message}`));
  process.exit(ExitCode.ERROR);
};

app
  .listen(FRONTEND_PORT)
  .on('listening', onListeningHandler)
  .on('error', onErrorHandler);
