import bodyParser from 'body-parser';
import cookies from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import ejsLayouts from 'express-ejs-layouts';
import session from 'express-session';
import path from 'path';

import {
  authenticateUser,
  defaultTemplateVariables,
  ROOT_PREFIX,
} from './common';
import { historyRouter } from './modules/history';
import { homeRouter } from './modules/home';
import { lotRouter } from './modules/lot';
import { User, userRouter } from './modules/user';

declare module 'express-session' {
  interface SessionData {
    user: User | null;
  }
}

dotenv.config();

const app = express();

// Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// Set cookies
app.use(cookies());

// Set session
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }),
);

// middlewares
app.use(authenticateUser);
app.use(defaultTemplateVariables);

// Static Files
app.use(express.static('public'));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', [
  path.resolve(__dirname, 'common', 'views'),
  path.resolve(__dirname, 'modules'),
]);
app.set('layout', 'layouts/layout.ejs');
app.use(ejsLayouts);

// Add routing
app.use(ROOT_PREFIX, homeRouter);
app.use(ROOT_PREFIX, userRouter);
app.use(ROOT_PREFIX, historyRouter);
app.use(ROOT_PREFIX, lotRouter);

app.get('*', (_, res) => {
  res.status(404).send('Not Found');
});

// Set up server
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`⚡️ [server]: Server is running at http://localhost:${port}`);
});
