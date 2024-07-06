import { Router } from 'express';

import { registerCategoryRoutes } from './category.js';

const apiRoutes = Router();

registerCategoryRoutes(apiRoutes);

export { apiRoutes };
