import chalk from 'chalk';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { ExitCode, FRONT_PORT, HttpCode } from '../constants.js';
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

app.use(express.static(path.join(__dirname, PUBLIC_DIR)));

app.use(`/lots`, lotsRouter);
app.use(`/my`, myRouter);
app.use('/', mainRouter);

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).render('pages/errors/404');
});

app.use((err, req, res, next) => {
  console.error(chalk.red(err.stack));
  res.status(HttpCode.INTERNAL_SERVER_ERROR).render('pages/errors/500');
});

app.listen(FRONT_PORT, (err) => {
  if (err) {
    console.error(chalk.red(`An error occurred: ${err.message}`));
    process.exit(ExitCode.SUCCESS);
  }

  const url = `http://localhost:${FRONT_PORT}`;
  const text = `Front server is running on ${chalk.blueBright(url)}`;
  console.log(text);
});
