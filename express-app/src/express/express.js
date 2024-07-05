import chalk from 'chalk';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { ExitCode, FRONT_PORT } from '../constants.js';

const PUBLIC_DIR = 'public';
const TEMPLATES_DIR = 'templates';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.resolve(import.meta.dirname, TEMPLATES_DIR));

app.use(express.static(path.join(__dirname, PUBLIC_DIR)));

app.get('/', (req, res) => {
  res.render('pages/index');
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
