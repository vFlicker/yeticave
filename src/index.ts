import dotenv from 'dotenv';
import express from 'express';
import ejsLayouts from 'express-ejs-layouts';
import path from 'path';

import {
  formatPrice,
  getMinRate,
  getTimeLeft,
  isTimeFinishing,
} from './common';
import { categories, lots } from './database';

dotenv.config();

const app = express();
const port = process.env.PORT;

// Static Files
app.use(express.static('public'));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));
app.set('layout', 'layouts/layout');

app.use(ejsLayouts);

const getLotPath = (id: number) => `lots/${id}`;

app.get('/', (req, res) => {
  res.render('pages/home', {
    title: 'Home',
    categories,
    lots,
    helper: {
      formatPrice,
      getTimeLeft,
      isTimeFinishing,
      getLotPath,
    },
  });
});

app.get('/lots/:id', (req, res) => {
  const { id } = req.params;
  const index = Number(id) - 1;
  const lot = lots[index];

  res.render('pages/lot', {
    title: lot.title,
    categories,
    lot,
    helper: {
      formatPrice,
      getMinRate,
    },
  });
});

app.listen(port, () => {
  console.log(`⚡️ [server]: Server is running at http://localhost:${port}`);
});
