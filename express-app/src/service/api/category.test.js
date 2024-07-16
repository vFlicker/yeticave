import express from 'express';
import { Sequelize } from 'sequelize';
import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';

import { HttpCode } from '../../constants.js';
import { CategoryService } from '../data-service/category-service.js';
import { initDatabase } from '../lib/init-database.js';
import { registerCategoryRoutes } from './category.js';

const mockCategories = [
  { id: 1, name: 'Boards' },
  { id: 2, name: 'Attachment' },
];

const mockDatabase = new Sequelize('sqlite::memory:', { logging: false });

const app = express();
app.use(express.json());

beforeAll(async () => {
  await initDatabase(mockDatabase, { categories: mockCategories });
  registerCategoryRoutes(app, new CategoryService(mockDatabase));
});

describe('GET api/categories', () => {
  describe('API return a list of all categories', () => {
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

describe('GET api/categories/:id', () => {
  describe('API return a category by id', () => {
    let response;

    beforeAll(async () => {
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
      response = await request(app).get('/categories/3');
    });

    test('Should have response status 404', () => {
      expect(response.statusCode).toBe(HttpCode.NOT_FOUND);
    });

    test('Should have empty body', () => {
      expect(response.body).toEqual({});
    });
  });
});
