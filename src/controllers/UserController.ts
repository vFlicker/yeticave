import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import Joi from 'joi';

import { ROOT_PREFIX } from '../common';
import { users } from '../database';

type SingInData = {
  email: string;
  password: string;
};

export class UserController {
  public signInPage = (_: Request, res: Response) => {
    const user = {
      email: '',
      password: '',
    };

    res.render('pages/user/signIn', {
      pageTitle: 'Login',
      user,
      errors: [],
      hasErrors: false,
      canLogin: false,
      helper: {},
    });
  };

  public signIn = (req: Request, res: Response) => {
    const { body } = req;

    const pageTitle = 'Login';
    const errors = this.validateFormSingIn(body);
    const user = { ...body };

    if (errors) {
      const hasErrors = Boolean(errors);

      return res.render('pages/user/signIn', {
        pageTitle,
        user,
        errors,
        hasErrors,
        canLogin: false,
        helper: {},
      });
    }

    const foundUser = users.find(({ email }) => email === user.email);

    if (!foundUser) {
      const errors = {
        message: 'Invalid email or password',
      };

      return res.render('pages/user/signIn', {
        pageTitle,
        user,
        errors,
        hasErrors: true,
        canLogin: false,
        helper: {},
      });
    }

    bcrypt.compare(user.password, foundUser.password, (_, result) => {
      if (!result) {
        const errors = {
          message: 'Invalid email or password',
        };

        return res.render('pages/user/signIn', {
          pageTitle,
          user,
          errors,
          hasErrors: true,
          canLogin: false,
          helper: {},
        });
      }

      req.session.regenerate(() => {
        req.session.user = foundUser;

        req.session.save(() => {
          res.redirect(ROOT_PREFIX);
        });
      });
    });
  };

  public logout = (req: Request, res: Response) => {
    req.session.user = null;

    req.session.save(() => {
      req.session.regenerate(() => {
        res.redirect(ROOT_PREFIX);
      });
    });
  };

  private validateFormSingIn(data: SingInData) {
    const schema = Joi.object({
      email: Joi.string().email().max(64).required(),
      password: Joi.string().min(8),
    });

    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      const errors: Record<string, string> = {};

      error.details.forEach((detail) => {
        errors[detail.context!.key!] = detail.message;
      });

      return errors;
    }
  }
}
