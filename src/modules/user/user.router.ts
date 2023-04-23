import express from 'express';

import { LOGOUT_PAGE, SIGN_IN_PAGE, SIGN_UP_PAGE } from '../../common';
import { UserController } from './user.controller';

const userRouter = express.Router();
const userController = new UserController();

userRouter.get(SIGN_IN_PAGE, userController.getSignInPage);
userRouter.post(SIGN_IN_PAGE, userController.sendSignInForm);
userRouter.get(SIGN_UP_PAGE, userController.getSignUpPage);
userRouter.post(SIGN_UP_PAGE, userController.sendSignUpForm);
userRouter.get(LOGOUT_PAGE, userController.logout);

export default userRouter;
