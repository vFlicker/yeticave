import express from 'express';

import { SIGN_IN_PREFIX } from '../common';
import { UserController } from '../controllers';

export const userRouter = express.Router();
const userController = new UserController();

userRouter.get(SIGN_IN_PREFIX, userController.signInPage);
userRouter.post(SIGN_IN_PREFIX, userController.signIn);
