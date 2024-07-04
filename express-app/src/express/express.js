import chalk from 'chalk';
import express from 'express';

import { ExitCode, FRONT_PORT } from '../constants.js';

const app = express();

app.listen(FRONT_PORT, (err) => {
  if (err) {
    console.error(chalk.red(`An error occurred: ${err.message}`));
    process.exit(ExitCode.SUCCESS);
  }

  const url = `http://localhost:${FRONT_PORT}`;
  const text = `Front server is running on ${chalk.blueBright(url)}`;
  console.log(text);
});
