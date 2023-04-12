import bodyParser from 'body-parser';
import cookies from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import ejsLayouts from 'express-ejs-layouts';
import path from 'path';

import { HISTORY_PREFIX, LOTS_PREFIX, ROOT_PREFIX } from './common';
import { historyRouter, lotRouter, mainRouter, userRouter } from './routes';

dotenv.config();

const app = express();

// Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// Set cookies
app.use(cookies());

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
