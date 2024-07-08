import express from 'express';
import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';

import { HttpCode } from '../../constants.js';
import { registerCategoryRoutes } from './category.js';

const mockData = {
  categories: [
    {
      id: 1,
      name: 'Test category 1',
    },
    {
      id: 2,
      name: 'Test category 2',
    },
  ],
};

const app = express();
app.use(express.json());
registerCategoryRoutes(app, mockData);

describe('API returns categories', () => {
  let response;

  beforeAll(async () => {
    response = await request(app).get('/categories');
  });

  test('Should have response status 200', () => {
    expect(response.statusCode).toBe(HttpCode.OK);
  });

  test('Should have body with two categories', () => {
    expect(response.body).toHaveLength(2);
  });

  test('The first item should have id 1', () => {
    expect(response.body[0].id).toBe(1);
  });
});
