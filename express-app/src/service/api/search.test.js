import express from 'express';
import { Sequelize } from 'sequelize';
import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';

import { HttpCode } from '../../constants.js';
import {
  mockCategories,
  mockLots,
  mockUsers,
} from '../../mocks/test-mock-data.js';
import { SearchService } from '../data-service/search-service.js';
import { initDatabase } from '../lib/init-database.js';
import { registerSearchRoutes } from './search.js';

const mockDatabase = new Sequelize('sqlite::memory:', { logging: false });

const app = express();
app.use(express.json());

beforeAll(async () => {
  await initDatabase(mockDatabase, {
    categories: mockCategories,
    lots: mockLots,
    users: mockUsers,
  });
  registerSearchRoutes(app, new SearchService(mockDatabase));
});

describe('GET api/search', () => {
  describe('API returns search results for the query', () => {
    let response = null;

    beforeAll(async () => {
      response = await request(app).get('/search?query=iPhone 13');
    });

    test('Should have response status 200', async () => {
      expect(response.statusCode).toBe(HttpCode.OK);
    });

    test('Should have body with one lot', async () => {
      expect(response.body).toHaveLength(1);
    });

    test('The item should have title "iPhone 13"', async () => {
      const { title: firstItemTitle } = response.body[0];
      expect(firstItemTitle).toBe('iPhone 13');
    });
  });

  describe('API returns 400 Bad Request when search query is not provided', () => {
    let response = null;

    beforeAll(async () => {
      response = await request(app).get('/search');
    });

    test('Should have response status 400', async () => {
      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
    });

    test('Should have empty array in the response body', async () => {
      expect(response.body).toEqual([]);
    });
  });

  describe('API returns 404 Not Found when search results are not found', () => {
    let response = null;

    beforeAll(async () => {
      response = await request(app).get('/search?query=Wrong Query');
    });

    test('Should have response status 404', async () => {
      expect(response.statusCode).toBe(HttpCode.NOT_FOUND);
    });

    test('Should have empty array in the response body', async () => {
      expect(response.body).toEqual([]);
    });
  });
});
