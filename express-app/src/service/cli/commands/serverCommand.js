import chalk from 'chalk';
import express from 'express';

import { BACK_PORT, ExitCode } from '../../../constants.js';

const app = express();

export const serverCommand = {
  name: '--server',

  execute(_args) {
    app.listen(BACK_PORT, (err) => {
      if (err) {
        console.error(chalk.red(`An error occurred: ${err.message}`));
        process.exit(ExitCode.ERROR);
      }

      const url = `http://localhost:${BACK_PORT}`;
      const text = `Server is running on ${chalk.blueBright(url)}`;
      console.log(text);
    });
  },
};
