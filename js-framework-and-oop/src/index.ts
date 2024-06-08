import { App } from './app';
import { databaseConfig, DatabaseService } from './common';
import { ModelFactoryService } from './framework';
import { _404Router } from './modules/_404';
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
    ...historyRouter,
    ...homeRouter,
    ...lotRouter,
    ...betRouter,
    ...searchRouter,
    ...userRouter,
    ..._404Router,
  ],
  modelFactory,
);

app.run();
