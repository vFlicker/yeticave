import { Router } from 'express';

import { HttpCode } from '../../constants.js';
import { passwordHasher } from '../lib/password-hasher.js';
import { authValidator } from '../middlewares/auth-validator.js';
import { userValidator } from '../middlewares/user-validator.js';

const AuthMessageError = 'Email or password is incorrect';

export const registerUserRoutes = (app, userService) => {
  const router = Router();

  app.use('/user', router);

  router.post('/', userValidator(userService), async (req, res) => {
    const { password, ...userDataWithoutPassword } = req.body;
    const passwordHash = await passwordHasher.hash(password);
    const userDataWithHashedPassword = {
      ...userDataWithoutPassword,
      passwordHash,
    };
    const user = await userService.create(userDataWithHashedPassword);
    const { passwordHash: _, ...userWithoutPassword } = user;
    res.status(HttpCode.CREATED).json(userWithoutPassword);
  });

  router.post('/auth', authValidator, async (req, res) => {
    const { email, password } = req.body;
    const user = await userService.findByEmail(email);

    if (!user) {
      return res
        .status(HttpCode.UNAUTHORIZED)
        .json({ message: AuthMessageError });
    }

    const { passwordHash, ...userWithoutPassword } = user;
    const isPasswordCorrect = await passwordHasher.verify(
      password,
      passwordHash,
    );

    if (!isPasswordCorrect) {
      return res
        .status(HttpCode.UNAUTHORIZED)
        .json({ message: AuthMessageError });
    }

    res.status(HttpCode.OK).json(userWithoutPassword);
  });
};
