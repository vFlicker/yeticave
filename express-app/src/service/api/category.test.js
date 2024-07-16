import express from 'express';
import { Sequelize } from 'sequelize';
import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';

import { HttpCode } from '../../constants.js';
import { CategoryService } from '../data-service/category-service.js';
import { initDatabase } from '../lib/init-database.js';
import { registerCategoryRoutes } from './category.js';

const mockCategories = [{ name: 'Boards' }, { name: 'Attachment' }];

const mockLots = [
  {
    title: 'iPhone 13',
    description: 'Latest model of iPhone',
    imageUrl: 'http://example.com/iphone13.jpg',
    startingPrice: 1000,
    currentPrice: 1000,
    isActive: true,
    finishedAt: '2024-12-31T23:59:59Z',
    categoryId: 1,
    userId: 1,
  },
  {
    title: 'Harry Potter Book Set',
    description: 'Complete set of Harry Potter books',
    imageUrl: 'http://example.com/harrypotter.jpg',
    startingPrice: 50,
    currentPrice: 50,
    isActive: true,
    finishedAt: '2024-12-31T23:59:59Z',
    categoryId: 1,
    userId: 2,
  },
];

const mockUsers = [
  {
    email: 'user1@example.com',
    username: 'user1',
    passwordHash: 'hashed_password1',
  },
  {
    email: 'user2@example.com',
    username: 'user2',
    passwordHash: 'hashed_password2',
  },
];

const mockDatabase = new Sequelize('sqlite::memory:', { logging: false });

const app = express();
app.use(express.json());

beforeAll(async () => {
  await initDatabase(mockDatabase, {
    categories: mockCategories,
    lots: mockLots,
    users: mockUsers,
  });
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

describe('POST api/categories/count', () => {
  describe('API return categories with count of lots', () => {
    let response;

    beforeAll(async () => {
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
