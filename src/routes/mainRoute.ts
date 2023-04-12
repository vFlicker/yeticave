import express from 'express';

import { ROOT_PREFIX } from '../common';
import { HomeController } from '../controllers';

export const mainRouter = express.Router();
const homeController = new HomeController();

mainRouter.get(ROOT_PREFIX, homeController.indexPage);
