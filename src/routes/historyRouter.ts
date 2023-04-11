import express from 'express';

import { ROOT_PREFIX } from '../common';
import { HistoryController } from '../controllers/HistoryController';

export const historyRouter = express.Router();
const historyController = new HistoryController();

historyRouter.get(ROOT_PREFIX, historyController.indexPage);
