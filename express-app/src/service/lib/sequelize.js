import { Sequelize } from 'sequelize';

import { DB_FILE } from '../../constants.js';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: DB_FILE,
  pool: {
    max: 5,
    min: 0,
    acquire: 10000,
    idle: 10000,
  },
  // TODO: set false
  logging: true,
});
