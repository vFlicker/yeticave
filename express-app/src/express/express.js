import chalk from 'chalk';
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';
import { fileURLToPath } from 'url';

import { ExitCode, FRONT_PORT } from '../constants.js';
import { showPage404Middleware } from './middlewares/show-page-404-middleware.js';
import { showPage500Middleware } from './middlewares/show-page-500-middleware.js';
import { lotsRouter } from './routes/lots-routes.js';
import { mainRouter } from './routes/main-routes.js';
import { myRouter } from './routes/my-routes.js';

const PUBLIC_DIR = 'public';
const TEMPLATES_DIR = 'templates';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.resolve(import.meta.dirname, TEMPLATES_DIR));
app.use(expressLayouts);

app.use(express.static(path.join(__dirname, PUBLIC_DIR)));

app.use(`/lots`, lotsRouter);
app.use(`/my`, myRouter);
app.use('/', mainRouter);

app.use(showPage404Middleware);
app.use(showPage500Middleware);

const onListeningHandler = () => {
  const url = `http://localhost:${FRONT_PORT}`;
  const text = `Front server is running on ${chalk.blueBright(url)}`;
  console.log(text);
};

const onErrorHandler = (err) => {
  console.error(chalk.red(`An error occurred: ${err.message}`));
  process.exit(ExitCode.ERROR);
};

app
  .listen(FRONT_PORT)
  .on('listening', onListeningHandler)
  .on('error', onErrorHandler);
