import bodyParser from 'body-parser';
import cookies from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import ejsLayouts from 'express-ejs-layouts';
import session from 'express-session';
import path from 'path';

import { HISTORY_PREFIX, LOTS_PREFIX, ROOT_PREFIX } from './common';
import { authenticateUser } from './middlewares';
import { historyRouter, lotRouter, mainRouter, userRouter } from './routes';

dotenv.config();

const app = express();

type User = {
  avatar: string;
  name: string;
  email: string;
  password: string;
};

// Augment express-session with a custom SessionData object
declare module 'express-session' {
  interface SessionData {
    user: User | null;
  }
}

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

app.use(authenticateUser);

// Static Files
app.use(express.static('public'));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));
app.set('layout', 'layouts/layout');
app.use(ejsLayouts);

// Add routing
app.use(ROOT_PREFIX, mainRouter);
app.use(ROOT_PREFIX, userRouter);
app.use(HISTORY_PREFIX, historyRouter);
app.use(LOTS_PREFIX, lotRouter);

app.get('*', (_, res) => {
  res.status(404).send('Not Found');
});

// Set up server
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`⚡️ [server]: Server is running at http://localhost:${port}`);
});
