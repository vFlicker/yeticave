import chalk from 'chalk';
import express from 'express';

import { API_PORT, ExitCode } from '../../../constants.js';

const app = express();

export const serverCommand = {
  name: '--server',

  execute(_args) {
    app.listen(API_PORT, (err) => {
      if (err) {
        console.error(chalk.red(`An error occurred: ${err.message}`));
        process.exit(ExitCode.ERROR);
      }

      const url = `http://localhost:${API_PORT}`;
      const text = `Server is running on ${chalk.blueBright(url)}`;
      console.log(text);
    });
  },
};
