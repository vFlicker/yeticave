import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';

import { HttpCode } from '../../constants.js';
import { LotService } from '../data-service/lot-service.js';
import { createTestApi } from '../test/create-test-api.js';
import { mockUsers } from '../test/mocks.js';
import { registerLotRoutes } from './lot.js';

describe('GET api/lots', () => {
  describe('API return a list of all lots', async () => {
    let response;

    beforeAll(async () => {
      const app = await createTestApi(registerLotRoutes, LotService);
      response = await request(app).get('/lots');
    });

    test('Should have response status 200', () => {
      expect(response.statusCode).toBe(HttpCode.OK);
    });

    test('Should have body with two lots', () => {
      expect(response.body).toHaveLength(2);
    });

    test('The first item should have title "iPhone 13"', () => {
      const { title: firstItemTitle } = response.body[0];
      expect(firstItemTitle).toBe('iPhone 13');
    });

    test('Should have category "Boards" in the first item', () => {
      const { category } = response.body[0];
      const { name: categoryName } = category;
      expect(categoryName).toBe('Boards');
    });
  });
});

describe('GET api/lots/categories/:id', () => {
  describe('API return a list of lots with given category id', () => {
    let response;

    beforeAll(async () => {
      const app = await createTestApi(registerLotRoutes, LotService);
      response = await request(app).get('/lots/categories/1');
    });

    test('Should have response status 200', () => {
      expect(response.statusCode).toBe(HttpCode.OK);
    });

    test('Should have body with two lots', () => {
      expect(response.body).toHaveLength(2);
    });

    test('The first item should have title "iPhone 13"', () => {
      const { title: firstItemTitle } = response.body[0];
      expect(firstItemTitle).toBe('iPhone 13');
    });

    test('Should have category "Boards" in the first item', () => {
      const { category } = response.body[0];
      const { name: categoryName } = category;
      expect(categoryName).toBe('Boards');
    });
  });

  describe('API return 404 if lots not found', () => {
    let response;

    beforeAll(async () => {
      const app = await createTestApi(registerLotRoutes, LotService);
      response = await request(app).get('/lots/categories/3');
    });

    test('Should have response status 404', () => {
      expect(response.statusCode).toBe(HttpCode.NOT_FOUND);
    });

    test('Should have body with error message', () => {
      expect(response.text).toBe('Lots with category id 3 not found');
    });
  });
});

describe('GET api/lots/:id', () => {
  describe('API return a lot with given id', () => {
    let response;

    beforeAll(async () => {
      const app = await createTestApi(registerLotRoutes, LotService);
      response = await request(app).get('/lots/2');
    });

    test('Should have response status 200', () => {
      expect(response.statusCode).toBe(HttpCode.OK);
    });

    test('The item should have title "Harry Potter Book Set"', () => {
      const { title: firstItemTitle } = response.body;
      expect(firstItemTitle).toBe('Harry Potter Book Set');
    });

    test('Should have category "Boards" in the item', () => {
      const { category } = response.body;
      const { name: categoryName } = category;
      expect(categoryName).toBe('Boards');
    });

    test('Should have bids', () => {
      const { bids } = response.body;
      expect(bids).toHaveLength(1);
    });

    test('Should have comments', () => {
      const { comments } = response.body;
      expect(comments).toHaveLength(1);
    });

    test('Should have user', () => {
      const { user } = response.body;
      const secondMockUser = mockUsers[1];
      expect(user).toEqual(expect.objectContaining(secondMockUser));
    });
  });

  describe('API return 404 if offer not found', () => {
    let response;

    beforeAll(async () => {
      const app = await createTestApi(registerLotRoutes, LotService);
      response = await request(app).get('/lots/4');
    });

    test('Should have response status 404', () => {
      expect(response.statusCode).toBe(HttpCode.NOT_FOUND);
    });

    test('Should have body with error message', () => {
      expect(response.text).toBe('Lot with id 4 not found');
    });
  });
});

describe('POST api/lots', () => {
  describe('API create a new lot', () => {
    const lotData = {
      title: 'Test lot',
      description: 'Test lot description',
      imageUrl: 'http://example.com/test.jpg',
      startingPrice: 100,
      currentPrice: 100,
      finishedAt: '2024-12-31T23:59:59.000Z',
      categoryId: 2,
      userId: 1,
    };

    let response;
    let app;

    beforeAll(async () => {
      app = await createTestApi(registerLotRoutes, LotService);
      response = await request(app).post('/lots').send(lotData);
    });

    test('Should have response status 201', () => {
      expect(response.statusCode).toBe(HttpCode.CREATED);
    });

    test('Should have body with new lot', () => {
      expect(response.body).toEqual(expect.objectContaining(lotData));
    });

    test('Should increase lots count', async () => {
      const updatedResponse = await request(app).get('/lots');
      expect(updatedResponse.body).toHaveLength(3);
    });
  });

  describe('POST api/lots', () => {
    test.todo('API refuses to create an offer if data is invalid');
  });
});
