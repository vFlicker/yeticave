import chalk from 'chalk';

import { ExitCode } from '../../constants.js';

export const checkDatabaseConnect = async (sequelize, logger) => {
  try {
    logger.info(chalk.green('Trying to connect to the database...'));
    await sequelize.authenticate();
  } catch (err) {
    logger.error(
      chalk.red('An error occurred while trying to connect to the database'),
    );
    logger.error(chalk.red(err.message));
    process.exit(ExitCode.ERROR);
  }

  logger.info(
    chalk.green('Connection to the database has been established successfully'),
  );
};
