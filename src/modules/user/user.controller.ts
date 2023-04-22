import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

import { getView, ROOT_PREFIX } from '../../common';
import { createUserValidateSchema } from './schemas';
import { UserModel } from './user.model';

type SingInData = {
  email: string;
  password: string;
};

export class UserController {
  public getSignInPage = (_: Request, res: Response) => {
    const user = {
      email: '',
      password: '',
    };

    res.render(getView(__dirname, 'signInPage'), {
      pageTitle: 'Login',
      user,
      errors: [],
      hasErrors: false,
      canLogin: false,
      helper: {},
    });
  };

  public sendSignInForm = async (req: Request, res: Response) => {
    const { body } = req;

    const userModel = new UserModel();

    const pageTitle = 'Login';
    const errors = this.validateFormSingIn(body);
    const user = { ...body };

    if (errors) {
      const hasErrors = Boolean(errors);

      return res.render(getView(__dirname, 'signInPage'), {
        pageTitle,
        user,
        errors,
        hasErrors,
        canLogin: false,
        helper: {},
      });
    }

    const foundUser = await userModel.getUserByEmail(user.email);

    if (!foundUser) {
      const errors = {
        message: 'Invalid email or password',
      };

      return res.render(getView(__dirname, 'signInPage'), {
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

        return res.render(getView(__dirname, 'signInPage'), {
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
    const schema = createUserValidateSchema();
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
