import { defineModels } from '../models/define-models.js';

export const initDatabase = async (
  sequelize,
  { bids, categories, comments, lots, users },
) => {
  const { Bid, Category, Comment, Lot, User } = defineModels(sequelize);

  const transaction = await sequelize.transaction();

  try {
    await sequelize.sync({ force: true, transaction });

    await Promise.all([
      Category.bulkCreate(categories, { transaction }),
      User.bulkCreate(users, { transaction }),
      Lot.bulkCreate(lots, { transaction }),
      Bid.bulkCreate(bids, { transaction }),
      Comment.bulkCreate(comments, { transaction }),
    ]);

    await transaction.commit();

    return { Bid, Category, Comment, Lot, User };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
