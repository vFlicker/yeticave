import { SEARCH_PAGE } from '../../common';
import { Router } from '../../framework';
import { SearchController } from './search.controller';

export const searchRouter: Router = [
  {
    path: SEARCH_PAGE,
    method: 'get',
    className: SearchController,
    action: 'getSearchPage',
  },
];
