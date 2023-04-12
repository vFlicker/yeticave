import express from 'express';

import { ROOT_PREFIX } from '../../common';
import { HomeController } from './home.controller';

const homeRouter = express.Router();
const homeController = new HomeController();

homeRouter.get(ROOT_PREFIX, homeController.getHomePage);

export default homeRouter;
