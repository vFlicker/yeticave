import { Router } from 'express';

import { CategoryService } from '../data-service/category-service.js';
import { CommentService } from '../data-service/comment-service.js';
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
registerLotRoutes(
  apiRoutes,
  new LotService(sequelize),
  new CommentService(sequelize),
);
registerSearchRoutes(apiRoutes, new SearchService(sequelize));
