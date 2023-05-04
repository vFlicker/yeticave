import { App } from './app';
import { databaseConfig, DatabaseService, ModelFactoryService } from './common';
import { betRouter } from './modules/bet';
import { historyRouter } from './modules/history';
import { homeRouter } from './modules/home';
import { lotRouter } from './modules/lot';
import { searchRouter } from './modules/search';
import { userRouter } from './modules/user';

const databaseService = DatabaseService.getInstance(databaseConfig);
const modelFactory = ModelFactoryService.getInstance(databaseService);

const app = new App();

app.setRoutes(
  [
    ...betRouter,
    ...historyRouter,
    ...homeRouter,
    ...lotRouter,
    ...searchRouter,
    ...userRouter,
  ],
  modelFactory,
);

app.run();
