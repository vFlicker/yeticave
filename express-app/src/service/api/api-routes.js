import { Router } from 'express';

import { mockData } from '../../mocks/mock-server-data.js';
import { CategoryService } from '../data-service/category-service.js';
import { LotService } from '../data-service/lot-service.js';
import { SearchService } from '../data-service/search-service.js';
import { registerCategoryRoutes } from './category.js';
import { registerLotRoutes } from './lot.js';
import { registerSearchRoutes } from './search.js';

export const apiRoutes = Router();

registerCategoryRoutes(apiRoutes, new CategoryService(mockData));
registerLotRoutes(apiRoutes, new LotService(mockData));
registerSearchRoutes(apiRoutes, new SearchService(mockData));