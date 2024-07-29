import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';

import { HttpCode } from '../../constants.js';
import { UserService } from '../data-service/user-service.js';
import { createTestApi } from '../test/create-test-api.js';
import { registerUserRoutes } from './user.js';

const validCreateUserData = {
  username: 'New user',
  email: 'test@mail.com',
  password: 'password',
  passwordConfirm: 'password',
};

const validAuthUserData = {
  email: 'test@mail.com',
  password: 'password',
};

describe('POST api/user', () => {
  describe('API returns created user', () => {
    let response = null;

    beforeAll(async () => {
      const app = await createTestApi(registerUserRoutes, UserService);
      response = await request(app).post('/user').send(validCreateUserData);
    });

    test('Should return status code 201', () => {
      expect(response.statusCode).toBe(HttpCode.CREATED);
    });

    test('Should return user without password', () => {
      expect(response.body.username).toBe(validCreateUserData.username);
      expect(response.body.email).toBe(validCreateUserData.email);
      expect(response.body.password).toBeUndefined();
      expect(response.body.passwordHash).toBeUndefined();
      expect(response.body.passwordConfirm).toBeUndefined();
    });
  });

  describe('API returns error when user data is empty', () => {
    const invalidCreateUserData = {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
    };

    let response = null;

    beforeAll(async () => {
      const app = await createTestApi(registerUserRoutes, UserService);
      response = await request(app).post('/user').send(invalidCreateUserData);
    });

    test('Should return status code 400', () => {
      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
    });

    test('Should return error message', () => {
      expect(response.body).toEqual([
        { username: '"username" is not allowed to be empty' },
        { email: '"email" is not allowed to be empty' },
        { password: '"password" is not allowed to be empty' },
      ]);
    });
  });

  describe('API returns error when user data is wrong', () => {
    const invalidCreateUserData = {
      username: 'User name',
      email: 'wrong',
      password: 'password',
      passwordConfirm: 'password',
    };

    let response = null;

    beforeAll(async () => {
      const app = await createTestApi(registerUserRoutes, UserService);
      response = await request(app).post('/user').send(invalidCreateUserData);
    });

    test('Should return status code 400', () => {
      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
    });

    test('Should return error message', () => {
      expect(response.body).toEqual([{ email: 'Email must be a valid email' }]);
    });
  });

  describe('API returns error when password and passwordConfirm are not equal', () => {
    const invalidCreateUserData = {
      username: 'User name',
      email: 'test@mail.com',
      password: 'password',
      passwordConfirm: 'password1',
    };

    let response = null;

    beforeAll(async () => {
      const app = await createTestApi(registerUserRoutes, UserService);
      response = await request(app).post('/user').send(invalidCreateUserData);
    });

    test('Should return status code 400', () => {
      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
    });

    test('Should return error message', () => {
      expect(response.body).toEqual([
        { passwordConfirm: 'Passwords must match' },
      ]);
    });
  });

  describe('API returns error when user already exists', () => {
    let response = null;

    beforeAll(async () => {
      const app = await createTestApi(registerUserRoutes, UserService);
      await request(app).post('/user').send(validCreateUserData);
      response = await request(app).post('/user').send(validCreateUserData);
    });

    test('Should return status code 400', () => {
      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
    });

    test('Should return error message', () => {
      expect(response.body).toEqual({
        message: 'User with this email already exists',
      });
    });
  });
});

describe('POST api/user/auth', () => {
  describe('API returns user', () => {
    let response = null;

    beforeAll(async () => {
      const app = await createTestApi(registerUserRoutes, UserService);
      await request(app).post('/user').send(validCreateUserData);
      response = await request(app).post('/user/auth').send(validAuthUserData);
    });

    test('Should return status code 200', () => {
      expect(response.statusCode).toBe(HttpCode.OK);
    });

    test('Should return user without password', () => {
      expect(response.body.username).toBe(validCreateUserData.username);
      expect(response.body.email).toBe(validCreateUserData.email);
      expect(response.body.password).toBeUndefined();
    });
  });

  describe('API returns error if email is incorrect', () => {
    const invalidAuthUserData = {
      email: 'wrong@mail.com',
      password: 'password',
    };

    let response = null;

    beforeAll(async () => {
      const app = await createTestApi(registerUserRoutes, UserService);
      await request(app).post('/user').send(validCreateUserData);
      response = await request(app)
        .post('/user/auth')
        .send(invalidAuthUserData);
    });

    test('Should return status code 401', () => {
      expect(response.statusCode).toBe(HttpCode.UNAUTHORIZED);
    });

    test('Should return error message', () => {
      expect(response.body).toEqual({
        message: 'Email or password is incorrect',
      });
    });
  });

  describe('API returns error if password is incorrect', () => {
    const invalidAuthUserData = {
      email: 'test@mail.com',
      password: 'wrong password',
    };

    let response = null;

    beforeAll(async () => {
      const app = await createTestApi(registerUserRoutes, UserService);
      await request(app).post('/user').send(validCreateUserData);
      response = await request(app)
        .post('/user/auth')
        .send(invalidAuthUserData);
    });

    test('Should return status code 401', () => {
      expect(response.statusCode).toBe(HttpCode.UNAUTHORIZED);
    });

    test('Should return error message', () => {
      expect(response.body).toEqual({
        message: 'Email or password is incorrect',
      });
    });
  });

  describe('API returns error when user data is empty', () => {
    const invalidAuthUserData = {
      email: '',
      password: '',
    };

    let response = null;

    beforeAll(async () => {
      const app = await createTestApi(registerUserRoutes, UserService);
      await request(app).post('/user').send(validCreateUserData);
      response = await request(app)
        .post('/user/auth')
        .send(invalidAuthUserData);
    });

    test('Should return status code 400', () => {
      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
    });

    test('Should return error message', () => {
      expect(response.body).toEqual([
        { email: '"email" is not allowed to be empty' },
        { password: '"password" is not allowed to be empty' },
      ]);
    });
  });
});
