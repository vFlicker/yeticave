import express from 'express';

import { HomeController } from '../controllers/HomeController';

export const mainRouter = express.Router();
const homeController = new HomeController();

mainRouter.get('/', homeController.index);
