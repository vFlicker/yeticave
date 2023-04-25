import express from 'express';

import { MY_BET_PAGE } from '../../common';
import { BetController } from './bet.controller';

const betRouter = express.Router();
const betController = new BetController();

betRouter.get(MY_BET_PAGE, betController.getMyBetsPage);

export default betRouter;
