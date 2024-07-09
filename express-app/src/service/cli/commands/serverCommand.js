import chalk from 'chalk';
import express from 'express';

import { API_PREFIX, BACK_PORT, ExitCode } from '../../../constants.js';
import { apiRoutes } from '../../api/index.js';

const app = express();

app.use(express.json());
app.use(API_PREFIX, apiRoutes);

export const serverCommand = {
  name: '--server',

  execute(_args) {
    try {
      app.listen(BACK_PORT, (err) => {
        if (err) {
          console.error(chalk.red(`An error occurred: ${err.message}`));
          process.exit(ExitCode.ERROR);
        }

        const url = `http://localhost:${BACK_PORT}`;
        const text = `Server is running on ${chalk.blueBright(url)}`;
        console.log(text);
      });
    } catch (err) {
      console.error(chalk.red(`An error occurred: ${err.message}`));
      process.exit(ExitCode.ERROR);
    }
  },
};
