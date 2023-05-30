import {
  LOGIN,
  LOGIN_PAGE,
  LOGOUT,
  REGISTER,
  REGISTER_PAGE,
} from '../../common';
import { Router } from '../../framework';
import { UserController } from './user.controller';

export const userRouter: Router = [
  {
    path: LOGIN_PAGE,
    method: 'get',
    className: UserController,
    action: 'getLoginPage',
  },
  {
    path: REGISTER_PAGE,
    method: 'get',
    className: UserController,
    action: 'getRegisterPage',
  },
  {
    path: LOGIN,
    method: 'post',
    className: UserController,
    action: 'login',
  },
  {
    path: REGISTER,
    method: 'post',
    className: UserController,
    action: 'register',
  },
  {
    path: LOGOUT,
    method: 'get',
    className: UserController,
    action: 'logout',
  },
];
