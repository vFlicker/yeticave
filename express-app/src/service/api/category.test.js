import express from 'express';
import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';

import { HttpCode } from '../../constants.js';
import { CategoryService } from '../data-service/CategoryService.js';
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
registerCategoryRoutes(app, new CategoryService(mockData));

describe('GET api/categories', () => {
  describe('API return a lost of all categories', () => {
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
      const { id: firstItemId } = response.body[0];
      expect(firstItemId).toBe(1);
    });
  });
});
