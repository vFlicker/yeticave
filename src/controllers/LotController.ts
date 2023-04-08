import { Request, Response } from 'express';

// TODO: use injection
import { formatPrice, getMinRate } from '../common';
// TODO: use injection
import { categories, lots } from '../database';

export class LotController {
  public addGet = (req: Request, res: Response) => {
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
  };

  public addPost = (req: Request, res: Response) => {
    const { body, file } = req;

    // validate
    const errors = this.validateAddLotForm(body);
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
  };

  public getById = (req: Request, res: Response) => {
    const { id } = req.params;
    const index = Number(id) - 1;
    const lot = lots[index];

    if (!lot) return res.status(404).send('what???');

    res.render('pages/lot/lot', {
      title: lot.title,
      categories,
      lot,
      helper: {
        formatPrice,
        getMinRate,
      },
    });
  };

  private validateAddLotForm(post: any) {
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
}
