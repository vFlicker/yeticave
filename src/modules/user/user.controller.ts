import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

import { LOGIN, ROOT_PREFIX, ValidationService } from '../../common';
import { BaseController } from '../../framework';
import { LoginData, User } from './interfaces';
import { createUserSchema, registerUserSchema } from './schemas';
import { UserModel } from './user.model';

export class UserController extends BaseController {
  protected dirname = __dirname;

  public getLoginPage = (req: Request, res: Response): void => {
    const user = this.getSession(req, 'user');

    this.pageTitle = 'Login';

    if (user) {
      this.redirect(res, ROOT_PREFIX);
      return;
    }

    const userModel = this.modelFactoryService.getEmptyModel(UserModel);

    this.render(res, 'loginPage', {
      user: userModel,
      errors: [],
      hasErrors: false,
      canLogin: false,
      helper: {},
    });
  };

  public login = async (req: Request, res: Response): Promise<void> => {
    const formData = this.getBody<LoginData>(req);

    this.pageTitle = 'Login';

    const userModel = this.modelFactoryService.getEmptyModel(UserModel);

    const validation = new ValidationService(
      createUserSchema,
      formData,
    ).validate();

    if (validation.hasErrors()) {
      return this.render(res, 'loginPage', {
        user: formData,
        errors: validation.getErrors(),
        hasErrors: validation.hasErrors(),
        canLogin: false,
        helper: {},
      });
    }

    try {
      const errors = { message: 'Invalid email or password' };

      const foundUser = await userModel.getUserByEmail(formData.email);

      if (!foundUser) {
        return this.render(res, 'loginPage', {
          user: formData,
          errors,
          hasErrors: true,
          canLogin: false,
          helper: {},
        });
      }

      bcrypt.compare(formData.password, foundUser.password, (_, result) => {
        if (!result) {
          this.render(res, 'loginPage', {
            user: formData,
            errors,
            hasErrors: true,
            canLogin: false,
            helper: {},
          });

          return;
        }

        req.session.regenerate(() => {
          req.session.user = foundUser;

          req.session.save(() => {
            this.redirect(res, ROOT_PREFIX);
          });
        });
      });
    } catch (error) {
      this.renderError(res, error);
    }
  };

  public getRegisterPage = async (_: Request, res: Response): Promise<void> => {
    this.pageTitle = 'Register';

    const userModel = this.modelFactoryService.getEmptyModel(UserModel);

    this.render(res, 'registerPage', {
      user: userModel,
      errors: [],
      hasErrors: false,
      canLogin: false,
      helper: {},
    });
  };

  public register = async (req: Request, res: Response): Promise<void> => {
    const formData = this.getBody<Omit<User, 'id'>>(req);

    this.pageTitle = 'Register';

    // TODO: const registerModel = new RegisterModel();
    // registerModel.load(formData);
    const userModel = this.modelFactoryService.getEmptyModel(UserModel);

    const validation = new ValidationService(
      registerUserSchema,
      formData,
    ).validate();

    if (validation.hasErrors()) {
      this.render(res, 'registerPage', {
        user: formData,
        errors: validation.getErrors(),
        hasErrors: validation.hasErrors(),
        canLogin: false,
        helper: {},
      });

      return;
    }

    const { name, email, password, contacts } = formData;

    try {
      // TODO: check user email uniq
      const passwordHash = await bcrypt.hash(password, 10);
      await userModel.createNewUser({
        name,
        email,
        password: passwordHash,
        contacts,
      });

      this.redirect(res, LOGIN);
    } catch (error) {
      this.renderError(res, error);
    }
  };

  public logout = (req: Request, res: Response) => {
    this.closeSession(req, 'user');

    req.session.save(() => {
      req.session.regenerate(() => {
        this.redirect(res, ROOT_PREFIX);
      });
    });
  };
}
