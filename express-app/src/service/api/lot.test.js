import express from 'express';
import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';

import { HttpCode } from '../../constants.js';
import { LotService } from '../data-service/LotService.js';
import { registerLotRoutes } from './lot.js';

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

const createApi = () => {
  const app = express();
  const clonedData = JSON.parse(JSON.stringify(mockData));
  app.use(express.json());
  registerLotRoutes(app, new LotService(clonedData));
  return app;
};

describe('GET api/lots', () => {
  describe('API return a list of all lots', () => {
    const app = createApi();
    let response;

    beforeAll(async () => {
      response = await request(app).get('/lots');
    });

    test('Should have response status 200', () => {
      expect(response.statusCode).toBe(HttpCode.OK);
    });

    test('Should have body with one lot', () => {
      expect(response.body).toHaveLength(1);
    });

    test('The first item should have id 1', () => {
      const { id: firstItemId } = response.body[0];
      expect(firstItemId).toBe(1);
    });
  });
});

describe('GET api/lots/categories/:id', () => {
  describe('API return a list of lots with given category id', () => {
    const app = createApi();
    let response;

    beforeAll(async () => {
      response = await request(app).get('/lots/categories/1');
    });

    test('Should have response status 200', () => {
      expect(response.statusCode).toBe(HttpCode.OK);
    });

    test('Should have body with one lot', () => {
      expect(response.body).toHaveLength(1);
    });

    test('The first item should have id 1', () => {
      const { id: firstItemId } = response.body[0];
      expect(firstItemId).toBe(1);
    });
  });

  describe('API return 404 if lots not found', () => {
    const app = createApi();
    let response;

    beforeAll(async () => {
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
  describe('API return an offer with given id', () => {
    const app = createApi();
    let response;

    beforeAll(async () => {
      response = await request(app).get('/lots/1');
    });

    test('Should have response status 200', () => {
      expect(response.statusCode).toBe(HttpCode.OK);
    });

    test('Should have body with one lot', () => {
      expect(response.body.id).toBe(1);
    });
  });

  describe('API return 404 if offer not found', () => {
    const app = createApi();
    let response;

    beforeAll(async () => {
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
    const newLot = {
      name: 'Test lot 2',
      categoryId: 2,
    };

    const app = createApi();
    let response;

    beforeAll(async () => {
      response = await request(app).post('/lots').send(newLot);
    });

    test('Should have response status 201', () => {
      expect(response.statusCode).toBe(HttpCode.CREATED);
    });

    test('Should have body with new lot', () => {
      expect(response.body).toEqual(expect.objectContaining(newLot));
    });

    test('Should have a new lot in lots list', async () => {
      const response = await request(app).get('/lots');
      expect(response.body).toHaveLength(2);
    });
  });
});

describe('POST api/lots', () => {
  describe('API create a new lot', () => {
    const newLot = {
      name: 'Test lot 2',
      categoryId: 2,
    };

    const app = createApi();
    let response;

    beforeAll(async () => {
      response = await request(app).post('/lots').send(newLot);
    });

    test('Should have response status 201', () => {
      expect(response.statusCode).toBe(HttpCode.CREATED);
    });

    test('Should have body with new lot', () => {
      expect(response.body).toEqual(expect.objectContaining(newLot));
    });

    test('Should have a new lot in lots list', async () => {
      const response = await request(app).get('/lots');
      expect(response.body).toHaveLength(2);
    });
  });

  test.todo('API refuses to create an offer if data is invalid');
});
