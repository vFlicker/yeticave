import express from 'express';
import { Sequelize } from 'sequelize';

import { initDatabase } from '../lib/init-database.js';
import {
  mockBids,
  mockCategories,
  mockComments,
  mockLots,
  mockUsers,
} from './mocks.js';

export const createTestApi = async (routeRegister, ...services) => {
  const app = express();
  app.use(express.json());

  const mockDatabase = new Sequelize('sqlite::memory:', { logging: false });
  await initDatabase(mockDatabase, {
    categories: mockCategories,
    lots: mockLots,
    bids: mockBids,
    comments: mockComments,
    users: mockUsers,
  });

  routeRegister(app, ...services.map((Service) => new Service(mockDatabase)));
  return app;
};
