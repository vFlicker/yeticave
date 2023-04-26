import express from 'express';

import { SEARCH_PAGE } from '../../common';
import { SearchController } from './search.controller';

const searchRouter = express.Router();
const lotController = new SearchController();

searchRouter.get(SEARCH_PAGE, lotController.getSearchPage);

export default searchRouter;
