import dotenv from 'dotenv';
import express from 'express';
import ejsLayouts from 'express-ejs-layouts';
import path from 'path';

import { lotRouter, mainRouter } from './routes';

dotenv.config();

const app = express();

// Static Files
app.use(express.static('public'));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));
app.set('layout', 'layouts/layout');
app.use(ejsLayouts);

// Add routing
app.use('/', mainRouter);
app.use('/lots', lotRouter);

app.get('*', (_, res) => {
  res.status(404).send('Not Found');
});

// Set up server
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`⚡️ [server]: Server is running at http://localhost:${port}`);
});
