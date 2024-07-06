import chalk from 'chalk';
import fs from 'fs/promises';

const FILENAME = 'package.json';

export const versionCommand = {
  name: '--version',

  async execute(_args) {
    const data = await fs.readFile(FILENAME);
    const { version } = JSON.parse(data.toString());
    console.log(chalk.blue(version));
  },
};
