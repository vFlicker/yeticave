import chalk from 'chalk';
import fs from 'fs/promises';

import { checkDatabaseConnect } from '../../lib/check-database-connect.js';
import { initDatabase } from '../../lib/init-database.js';
import { logger } from '../../lib/logger.js';
import { sequelize } from '../../lib/sequelize.js';

const FILE_DATABASE_PATH = './data/database.json';

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    return JSON.parse(content);
  } catch (err) {
    logger.error(chalk.red('Error when reading the file'));
    logger.error(chalk.red(err.message));
    return [];
  }
};

export const fillDatabaseCommand = {
  name: '--fill-db',

  async execute(_args) {
    await checkDatabaseConnect(sequelize, logger);
    const databaseModelsData = await readContent(FILE_DATABASE_PATH);
    initDatabase(sequelize, databaseModelsData);
  },
};
