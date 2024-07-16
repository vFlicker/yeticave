import { Router } from 'express';

import { mockData } from '../../mocks/mock-server-data.js';
import { CategoryService } from '../data-service/category-service.js';
import { LotService } from '../data-service/lot-service.js';
import { SearchService } from '../data-service/search-service.js';
import { sequelize } from '../lib/sequelize.js';
import { defineModels } from '../models/define-models.js';
import { registerCategoryRoutes } from './category.js';
import { registerLotRoutes } from './lot.js';
import { registerSearchRoutes } from './search.js';

export const apiRoutes = Router();

defineModels(sequelize);

registerCategoryRoutes(apiRoutes, new CategoryService(sequelize));
registerLotRoutes(apiRoutes, new LotService(mockData));
registerSearchRoutes(apiRoutes, new SearchService(mockData));
