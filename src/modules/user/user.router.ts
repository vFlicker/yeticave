import express from 'express';

import { LOGOUT_PAGE, SIGN_IN_PAGE } from '../../common';
import { UserController } from './user.controller';

const userRouter = express.Router();
const userController = new UserController();

userRouter.get(SIGN_IN_PAGE, userController.getSignInPage);
userRouter.post(SIGN_IN_PAGE, userController.sendSignInForm);
userRouter.get(LOGOUT_PAGE, userController.logout);

export default userRouter;
