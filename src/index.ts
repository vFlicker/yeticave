import dotenv from 'dotenv';
import express from 'express';
import ejsLayouts from 'express-ejs-layouts';
import path from 'path';

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

app.get('/', (req, res) => {
  res.render('pages/home', { title: 'Home' });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
