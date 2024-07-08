import { Router } from 'express';

import { mockData } from '../../mocks/mock-server-data.js';
import { registerCategoryRoutes } from './category.js';

export const apiRoutes = Router();

registerCategoryRoutes(apiRoutes, mockData);
