import express from 'express';

import { HISTORY_PAGE } from '../../common';
import { HistoryController } from './history.controller';

const historyRouter = express.Router();
const historyController = new HistoryController();

historyRouter.get(HISTORY_PAGE, historyController.getHistoryPage);

export default historyRouter;
