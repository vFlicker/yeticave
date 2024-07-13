import { defineModels } from '../models/define-models.js';

export const initDatabase = async (sequelize, { categories }) => {
  const { Category } = defineModels(sequelize);
  await sequelize.sync({ force: true });
  await Category.bulkCreate(categories);
};
