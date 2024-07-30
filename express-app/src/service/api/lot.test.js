import request from 'supertest';
import { beforeAll, describe, expect, test } from 'vitest';

import { HttpCode } from '../../constants.js';
import { CommentService } from '../data-service/comment-service.js';
import { LotService } from '../data-service/lot-service.js';
import { createTestApi } from '../test/create-test-api.js';
import { mockUsers } from '../test/mocks.js';
import { registerLotRoutes } from './lot.js';

const validLotData = {
  title: 'Test lot',
  description: 'Test lot description',
  imageUrl: 'http://example.com/test.jpg',
  startingPrice: 100,
  currentPrice: 100,
  finishedAt: '2024-12-31T23:59:59.000Z',
  categoryId: 2,
  userId: 1,
};

const validCommentData = {
  text: 'Test comment that have at least 20 characters',
  userId: 1,
  lotId: 1,
};

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

  describe('API return a list of lots with pagination', async () => {
    let response;

    beforeAll(async () => {
      const app = await createTestApi(registerLotRoutes, LotService);
      response = await request(app).get('/lots?limit=1&offset=0');
    });

    test('Should have response status 200', () => {
      expect(response.statusCode).toBe(HttpCode.OK);
    });

    test('Should have body with rows and count', () => {
      expect(response.body).toEqual(
        expect.objectContaining({ rows: expect.any(Array), count: 2 }),
      );
    });

    test('Should have one item in rows', () => {
      expect(response.body.rows).toHaveLength(1);
    });

    test('The first item should have title "iPhone 13"', () => {
      const { title: firstItemTitle } = response.body.rows[0];
      expect(firstItemTitle).toBe('iPhone 13');
    });
  });
});

describe('POST api/lots', () => {
  describe('API create a new lot', () => {
    let response;
    let app;

    beforeAll(async () => {
      app = await createTestApi(registerLotRoutes, LotService);
      response = await request(app).post('/lots').send(validLotData);
    });

    test('Should have response status 201', () => {
      expect(response.statusCode).toBe(HttpCode.CREATED);
    });

    test('Should have body with new lot', () => {
      const { categoryId, ...lotWithoutCategoryId } = validLotData;
      expect(response.body).toEqual(
        expect.objectContaining(lotWithoutCategoryId),
      );
    });

    test('Should increase lots count', async () => {
      const updatedResponse = await request(app).get('/lots');
      expect(updatedResponse.body).toHaveLength(3);
    });

    test('Should have socket emit event', () => {
      const { io } = app.locals;
      const { categoryId, ...lotDataWithoutCategoryId } = validLotData;
      expect(io.emit.mock.calls).toEqual([
        [
          'lot:created',
          expect.objectContaining({
            ...lotDataWithoutCategoryId,
            finishedAt: new Date(validLotData.finishedAt),
          }),
        ],
      ]);
    });
  });

  describe('API refuses to create a lot if data is invalid', () => {
    const invalidLotData = {
      title: '',
      description: '',
      imageUrl: '',
      startingPrice: 0,
      currentPrice: 0,
      finishedAt: '',
      categoryId: 0,
      userId: 0,
    };

    let response;

    beforeAll(async () => {
      const app = await createTestApi(registerLotRoutes, LotService);
      response = await request(app).post('/lots').send(invalidLotData);
    });

    test('Should have response status 400', () => {
      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
    });

    test('Should have body with error message', () => {
      expect(response.body).toEqual([
        { title: '"title" is not allowed to be empty' },
        { description: '"description" is not allowed to be empty' },
        { imageUrl: 'Image is not selected or type is not valid' },
        { startingPrice: '"startingPrice" must be greater than or equal to 1' },
        { currentPrice: '"currentPrice" must be greater than or equal to 1' },
        { finishedAt: 'Date is not selected or type is not valid' },
        { categoryId: '"categoryId" must be a positive number' },
        { categoryId: '"categoryId" must be greater than or equal to 1' },
        { userId: '"userId" must be a positive number' },
        { userId: '"userId" must be greater than or equal to 1' },
      ]);
    });
  });

  describe('API refuses to create a lot if field types are invalid', () => {
    const invalidLotData = {
      title: 123,
      description: 123,
      imageUrl: 'invalid-url',
      startingPrice: 'invalid-price',
      currentPrice: 'invalid-price',
      finishedAt: 'invalid-date',
      categoryId: 'invalid-category',
      userId: 'invalid-user',
    };

    let response;

    beforeAll(async () => {
      const app = await createTestApi(registerLotRoutes, LotService);
      response = await request(app).post('/lots').send(invalidLotData);
    });

    test('Should have response status 400', () => {
      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
    });

    test('Should have body with error message', () => {
      expect(response.body).toEqual([
        { title: '"title" must be a string' },
        { description: '"description" must be a string' },
        { startingPrice: 'Starting price must be at least 1' },
        { currentPrice: 'Current price must be at least 1' },
        { finishedAt: 'Date is not selected or type is not valid' },
        { categoryId: 'Category is not selected' },
        { userId: 'User is not selected' },
      ]);
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
      expect(response.body).toEqual({
        message: 'Lots with category id 3 not found',
      });
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

    test('Should have user without passwordHash', () => {
      const { user } = response.body;
      const { passwordHash, ...secondUserWithoutPasswordHash } = mockUsers[1];
      expect(user).toEqual(
        expect.objectContaining(secondUserWithoutPasswordHash),
      );
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
      expect(response.body).toEqual({ message: 'Lot with id 4 not found' });
    });
  });
});

describe('GET api/lots/:id/comments', () => {
  describe('API return a list of comments for lot with given id', () => {
    let response;

    beforeAll(async () => {
      const app = await createTestApi(
        registerLotRoutes,
        LotService,
        CommentService,
      );
      response = await request(app).get('/lots/1/comments');
    });

    test('Should have response status 200', () => {
      expect(response.statusCode).toBe(HttpCode.OK);
    });

    test('Should have body with two comments', () => {
      expect(response.body).toHaveLength(2);
    });

    test('The first comment should have text "Great product!"', () => {
      const { text: firstCommentText } = response.body[0];
      expect(firstCommentText).toBe('Great product!');
    });
  });

  describe('API return 404 if comments not found', () => {
    let response;

    beforeAll(async () => {
      const app = await createTestApi(
        registerLotRoutes,
        LotService,
        CommentService,
      );

      response = await request(app).get('/lots/3/comments');
    });

    test('Should have response status 404', () => {
      expect(response.statusCode).toBe(HttpCode.NOT_FOUND);
    });

    test('Should have body with error message', () => {
      expect(response.body).toEqual({ message: 'Lot with id 3 not found' });
    });
  });
});

describe('POST api/lots/:id/comments', () => {
  describe('API create a new comment for lot with given id', () => {
    let response;
    let app;

    beforeAll(async () => {
      app = await createTestApi(registerLotRoutes, LotService, CommentService);
      response = await request(app)
        .post('/lots/1/comments')
        .send(validCommentData);
    });

    test('Should have response status 201', () => {
      expect(response.statusCode).toBe(HttpCode.CREATED);
    });

    test('Should have body with new comment', () => {
      expect(response.body).toEqual(expect.objectContaining(validCommentData));
    });

    test('Should increase comments count', async () => {
      const updatedResponse = await request(app).get('/lots/1/comments');
      expect(updatedResponse.body).toHaveLength(3);
    });
  });

  describe('API refuses to create a comment if data is invalid', () => {
    const invalidCommentData = {
      text: 'Short comment',
      userId: 1,
      lotId: 1,
    };

    let response;

    beforeAll(async () => {
      const app = await createTestApi(
        registerLotRoutes,
        LotService,
        CommentService,
      );
      response = await request(app)
        .post('/lots/1/comments')
        .send(invalidCommentData);
    });

    test('Should have response status 400', () => {
      expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
    });

    test('Should have body with error message', () => {
      expect(response.body).toEqual([
        { text: 'Comment must be at least 20 characters long' },
      ]);
    });
  });

  describe('API refuses to create a comment if lot not found', () => {
    let response;

    beforeAll(async () => {
      const app = await createTestApi(
        registerLotRoutes,
        LotService,
        CommentService,
      );
      response = await request(app)
        .post('/lots/333/comments')
        .send(validCommentData);
    });

    test('Should have response status 404', () => {
      expect(response.statusCode).toBe(HttpCode.NOT_FOUND);
    });

    test('Should have body with error message', () => {
      expect(response.body).toEqual({ message: 'Lot with id 333 not found' });
    });
  });
});
