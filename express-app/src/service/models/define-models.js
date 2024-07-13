import { defineCategory } from './define-category.js';

export const defineModels = (sequelize) => {
  const Category = defineCategory(sequelize);
  return { Category };
};
