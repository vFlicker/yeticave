import { Router } from 'express';

import { mockData } from '../../mocks/mock-server-data.js';
import { CategoryService } from '../data-service/CategoryService.js';
import { LotService } from '../data-service/LotService.js';
import { registerCategoryRoutes } from './category.js';
import { registerLotRoutes } from './lot.js';

export const apiRoutes = Router();

registerCategoryRoutes(apiRoutes, new CategoryService(mockData));
registerLotRoutes(apiRoutes, new LotService(mockData));
