import { Router } from 'express';

import { HttpCode } from '../../constants.js';

export const registerSearchRoutes = (app, searchService) => {
  const router = Router();

  app.use('/search', router);

  router.get('/', async (req, res) => {
    const { query = '' } = req.query;

    if (!query) {
      res.status(HttpCode.BAD_REQUEST);
      res.json([]);
      return;
    }

    const searchResults = await searchService.search(query);
    const searchStatus =
      searchResults.length > 0 ? HttpCode.OK : HttpCode.NOT_FOUND;

    res.status(searchStatus);
    res.json(searchResults);
  });
};
