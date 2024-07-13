import express from 'express';
import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';

import { HttpCode } from '../../constants.js';
import { SearchService } from '../data-service/search-service.js';
import { registerSearchRoutes } from './search.js';

const mockData = {
  users: [
    {
      id: 1,
      name: 'Test user 1',
      email: 'test-email@mail.com',
    },
  ],
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
  bids: [
    {
      id: 1,
      amount: 100,
      userId: 1,
      lotId: 1,
      createdAt: '2021-06-10T13:25:00',
    },
  ],
  comments: [
    {
      id: 1,
      userId: 1,
      lotId: 1,
      text: 'Test comment 1',
      createdAt: '2021-06-10T13:25:00',
    },
  ],
  lots: [
    {
      id: 1,
      categoryId: 1,
      title: 'Test lot 1',
      description: 'Test description 1',
      image: 'https://test-image.com',
      startingPrice: 1,
      currentPrice: 100,
      bidsIds: [1],
      commentsIds: [1],
    },
  ],
};

const app = express();
app.use(express.json());
registerSearchRoutes(app, new SearchService(mockData));

describe('API returns search results', () => {
  describe('API returns search results for the query', () => {
    let response = null;

    beforeAll(async () => {
      response = await request(app).get('/search?query=1');
    });

    test('API returns 200 OK', async () => {
      expect(response.statusCode).toBe(HttpCode.OK);
    });

    test('Should have body with one lot', async () => {
      expect(response.body).toHaveLength(1);
    });
  });

  describe('API returns 400 Bad Request when search query is not provided', () => {
    let response = null;

    beforeAll(async () => {
      response = await request(app).get('/search');
    });

    test('API returns 400 Bad Request', async () => {
      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
    });

    test('API returns empty array', async () => {
      expect(response.body).toEqual([]);
    });
  });

  describe('API returns 404 Not Found when search results are not found', () => {
    let response = null;

    beforeAll(async () => {
      response = await request(app).get('/search?query=3');
    });

    test('API returns 404 Not Found', async () => {
      expect(response.statusCode).toBe(HttpCode.NOT_FOUND);
    });

    test('API returns empty array', async () => {
      expect(response.body).toEqual([]);
    });
  });
});
