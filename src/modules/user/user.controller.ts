import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

import { ROOT_PREFIX, SIGN_IN_PAGE, ValidationService } from '../../common';
import { BaseController } from '../../framework';
import { createUserSchema, registerUserSchema } from './schemas';
import { UserModel } from './user.model';

// TODO: create types
// type SingInData = {
//   email: string;
//   password: string;
// };

// type SingUpData = {
//   email: string;
//   password: string;
//   name: string;
//   contacts: string;
// };

export class UserController extends BaseController {
  protected dirname = __dirname;

  public getSignInPage = (req: Request, res: Response) => {
    if (req.session.user) return this.redirect(res, ROOT_PREFIX);

    const user = {
      email: '',
      password: '',
    };

    this.render(res, 'signInPage', {
      pageTitle: 'Login',
      user,
      errors: [],
      hasErrors: false,
      canLogin: false,
      helper: {},
    });
  };

  public sendSignInForm = async (req: Request, res: Response) => {
    const { body: formData } = req;

    const userModel = new UserModel();

    const pageTitle = 'Login';

    const validation = new ValidationService(
      createUserSchema,
      formData,
    ).validate();

    if (validation.hasErrors()) {
      return this.render(res, 'signInPage', {
        pageTitle,
        user: formData,
        errors: validation.getErrors(),
        hasErrors: validation.hasErrors(),
        canLogin: false,
        helper: {},
      });
    }

    const foundUser = await userModel.getUserByEmail(formData.email);

    if (!foundUser) {
      const errors = {
        message: 'Invalid email or password',
      };

      return this.render(res, 'signInPage', {
        pageTitle,
        user: formData,
        errors,
        hasErrors: true,
        canLogin: false,
        helper: {},
      });
    }

    bcrypt.compare(formData.password, foundUser.password, (_, result) => {
      if (!result) {
        const errors = {
          message: 'Invalid email or password',
        };

        return this.render(res, 'signInPage', {
          pageTitle,
          user: formData,
          errors,
          hasErrors: true,
          canLogin: false,
          helper: {},
        });
      }

      req.session.regenerate(() => {
        req.session.user = foundUser;

        req.session.save(() => {
          this.redirect(res, ROOT_PREFIX);
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

    this.render(res, 'signUpPage', {
      pageTitle: 'Register',
      user,
      errors: [],
      hasErrors: false,
      canLogin: false,
      helper: {},
    });
  };

  public sendSignUpForm = async (req: Request, res: Response) => {
    const { body: formData } = req;

    const userModel = new UserModel();

    const pageTitle = 'Register';

    const validation = new ValidationService(
      registerUserSchema,
      // TODO: replace formData in all controllers
      formData,
    ).validate();

    if (validation.hasErrors()) {
      return this.render(res, 'signUpPage', {
        pageTitle,
        user: formData,
        errors: validation.getErrors(),
        hasErrors: validation.hasErrors(),
        canLogin: false,
        helper: {},
      });
    }

    const { name, email, password, contacts } = formData;

    // TODO: check user email uniq

    const passwordHash = await bcrypt.hash(password, 10);
    await userModel.create({ name, email, password: passwordHash, contacts });

    this.redirect(res, SIGN_IN_PAGE);
  };

  public logout = (req: Request, res: Response) => {
    req.session.user = null;

    req.session.save(() => {
      req.session.regenerate(() => {
        this.redirect(res, ROOT_PREFIX);
      });
    });
  };
}
