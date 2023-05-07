import { LOGOUT_PAGE, SIGN_IN_PAGE, SIGN_UP_PAGE } from '../../common';
import { Router } from '../../framework';
import { UserController } from './user.controller';

export const userRouter: Router = [
  {
    path: SIGN_IN_PAGE,
    method: 'get',
    className: UserController,
    action: 'getSignInPage',
  },
  {
    path: SIGN_IN_PAGE,
    method: 'post',
    className: UserController,
    action: 'sendSignInForm',
  },
  {
    path: SIGN_UP_PAGE,
    method: 'get',
    className: UserController,
    action: 'getSignUpPage',
  },
  {
    path: SIGN_UP_PAGE,
    method: 'post',
    className: UserController,
    action: 'sendSignUpForm',
  },
  {
    path: LOGOUT_PAGE,
    method: 'get',
    className: UserController,
    action: 'logout',
  },
];
