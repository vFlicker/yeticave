import dotenv from 'dotenv';
import express from 'express';
import ejsLayouts from 'express-ejs-layouts';
import multer from 'multer';
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

  if (!lot) return res.status(404).send('what???');

  res.render('pages/lot/item', {
    title: lot.title,
    categories,
    lot,
    helper: {
      formatPrice,
      getMinRate,
    },
  });
});

app.get('/add', (req, res) => {
  const lot = {
    name: '',
    description: '',
    category: '',
    image: '',
    price: '',
    step: '',
    endDate: '',
  };

  res.render('pages/lot/add', {
    title: 'Add lot',
    categories,
    lot,
    errors: [],
    hasErrors: false,
    helper: {
      formatPrice,
      getMinRate,
    },
  });
});

function validateAddLotForm(post: any) {
  const errors = {} as any;

  for (const field in post) {
    const value = post[field];
    const max_length_of_lot_name = 255;

    if (field === 'name') {
      if (value === '') {
        errors[field] = 'Введите наименование лота';
      }
      if (value.length > max_length_of_lot_name) {
        errors[
          field
        ] = `Длина наименования лота не должна превышать ${max_length_of_lot_name} символов`;
      }
    }

    if (field === 'category') {
      if (value === 'Выберите категорию') {
        errors[field] = 'Выберите категорию';
      }
    }

    if (field === 'description') {
      if (value === '') {
        errors[field] = 'Напишите описание лота';
      }
    }

    if (field === 'price') {
      if (isNaN(value)) {
        errors[field] = 'Цена должна быть числом';
      }
      if (value < 0) {
        errors[field] = 'Цена должна быть больше 0';
      }
      if (value === '') {
        errors[field] = 'Введите начальную цену';
      }
    }

    if (field === 'step') {
      if (isNaN(value)) {
        errors[field] = 'Ставка должена быть числом';
      }
      if (value < 0) {
        errors[field] = 'Ставка должена быть больше 0';
      }
      if (value === '') {
        errors[field] = 'Введите вашу ставку';
      }
    }

    if (field === 'endDate') {
      if (new Date(value) <= new Date()) {
        errors[field] =
          'Укажите дату больше текущей даты, хотя бы на один день';
      }
      if (value === '') {
        errors[field] = 'Выберите дату';
      }
    }

    if (field === 'image') {
      if (value.type !== 'image/png' && value.type !== 'image/jpeg') {
        errors['file'] = 'Неизвестный формат изображения';
      }
      if (value === '') {
        errors['file'] = 'Загрузите картинку';
      }
    }
  }

  return errors;
}

const upload = multer({ dest: 'uploads/' });
app.post('/add', upload.single('lot'), (req, res) => {
  const { body, file } = req;

  // validate
  const errors = validateAddLotForm(body);
  const hasErrors = Object.keys(errors).length > 0;

  if (Object.keys(errors).length > 0) {
    const lot = { ...body, image: '' };

    return res.render('pages/lot/add', {
      title: 'Add lot',
      categories,
      lot,
      errors,
      hasErrors,
      helper: {
        formatPrice,
        getMinRate,
      },
    });
  }

  console.log('all is ok');
});

app.get('*', (_, res) => {
  res.status(404).send('what???');
});

app.listen(port, () => {
  console.log(`⚡️ [server]: Server is running at http://localhost:${port}`);
});
