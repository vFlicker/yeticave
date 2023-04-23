import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

import { getView, ROOT_PREFIX, SIGN_IN_PAGE } from '../../common';
import {
  createUserValidateSchema,
  registerUserValidateSchema,
} from './schemas';
import { UserModel } from './user.model';

type SingInData = {
  email: string;
  password: string;
};

type SingUpData = {
  email: string;
  password: string;
  name: string;
  contacts: string;
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
    const errors = this.validateSingInForm(body);
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

  public getSignUpPage = async (_: Request, res: Response) => {
    const user = {
      email: '',
      password: '',
      name: '',
      message: '',
    };

    res.render(getView(__dirname, 'signUpPage'), {
      pageTitle: 'Register',
      user,
      errors: [],
      hasErrors: false,
      canLogin: false,
      helper: {},
    });
  };

  public sendSignUpForm = async (req: Request, res: Response) => {
    const { body } = req;

    const userModel = new UserModel();

    const pageTitle = 'Register';
    const errors = this.validateSingUpForm(body);
    const user = { ...body } as SingUpData;

    if (errors) {
      const hasErrors = Boolean(errors);

      return res.render(getView(__dirname, 'signUpPage'), {
        pageTitle,
        user,
        errors,
        hasErrors,
        canLogin: false,
        helper: {},
      });
    }

    const { name, email, password, contacts } = user;
    const passwordHash = await bcrypt.hash(password, 10);
    await userModel.create({ name, email, password: passwordHash, contacts });

    res.redirect(SIGN_IN_PAGE);
  };

  public logout = (req: Request, res: Response) => {
    req.session.user = null;

    req.session.save(() => {
      req.session.regenerate(() => {
        res.redirect(ROOT_PREFIX);
      });
    });
  };

  private validateSingInForm(data: SingInData) {
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

  private validateSingUpForm(data: SingUpData) {
    const schema = registerUserValidateSchema();
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
