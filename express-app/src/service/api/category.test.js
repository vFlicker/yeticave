import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';

import { HttpCode } from '../../constants.js';
import { CategoryService } from '../data-service/category-service.js';
import { createTestApi } from '../test/create-test-api.js';
import { registerCategoryRoutes } from './category.js';

describe('GET api/categories', () => {
  describe('API return a list of all categories', () => {
    let response;

    beforeAll(async () => {
      const app = await createTestApi(registerCategoryRoutes, CategoryService);
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

    test('Categories should have names "Boards" and "Attachment"', () => {
      const [firstCategory, secondCategory] = response.body;
      expect(firstCategory.name).toBe('Boards');
      expect(secondCategory.name).toBe('Attachment');
    });
  });
});

describe('POST api/categories/count', () => {
  describe('API return categories with count of lots', () => {
    let response;

    beforeAll(async () => {
      const app = await createTestApi(registerCategoryRoutes, CategoryService);
      response = await request(app).get('/categories/count');
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

    test('The first item should have count 2', () => {
      const { count } = response.body[0];
      expect(count).toBe(2);
    });

    test('The first item should have count 0', () => {
      const { count } = response.body[1];
      expect(count).toBe(0);
    });
  });
});

describe('GET api/categories/:id', () => {
  describe('API return a category by id', () => {
    let response;

    beforeAll(async () => {
      const app = await createTestApi(registerCategoryRoutes, CategoryService);
      response = await request(app).get('/categories/1');
    });

    test('Should have response status 200', () => {
      expect(response.statusCode).toBe(HttpCode.OK);
    });

    test('Should have body with category name "Boards"', () => {
      const { name } = response.body;
      expect(name).toBe('Boards');
    });
  });

  describe('API return 404 if category not found', () => {
    let response;

    beforeAll(async () => {
      const app = await createTestApi(registerCategoryRoutes, CategoryService);
      response = await request(app).get('/categories/3');
    });

    test('Should have response status 404', () => {
      expect(response.statusCode).toBe(HttpCode.NOT_FOUND);
    });

    test('Should have empty body', () => {
      expect(response.body).toEqual({
        message: 'Category not found',
      });
    });
  });
});
