import chalk from 'chalk';

import { readFile } from '../../../utils/readFile.js';

const packageJsonFile = await readFile(
  '../../../../package.json',
  import.meta.url,
);

export const versionCommand = {
  name: '--version',

  execute(_args) {
    const version = packageJsonFile.version;
    console.log(chalk.blue(version));
  },
};
