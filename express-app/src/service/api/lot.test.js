import express from 'express';
import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';

import { HttpCode } from '../../constants.js';
import { LotService } from '../data-service/LotService.js';
import { registerLotRoutes } from './lot.js';

const mockData = {
  lots: [
    {
      id: 1,
      name: 'Test category 1',
      categoryId: 2,
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
  describe('API return a lost of all lots', () => {
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
      expect(response.body).toEqual(mockData.lots[0]);
    });
  });

  describe('API return 404 if offer not found', () => {
    const app = createApi();
    let response;

    beforeAll(async () => {
      response = await request(app).get('/lots/2');
    });

    test('Should have response status 404', () => {
      expect(response.statusCode).toBe(HttpCode.NOT_FOUND);
    });

    test('Should have body with error message', () => {
      expect(response.text).toBe('Lot with id 2 not found');
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
