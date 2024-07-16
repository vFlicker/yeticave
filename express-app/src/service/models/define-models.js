import { defineBid } from './define-bid.js';
import { defineCategory } from './define-category.js';
import { defineComment } from './define-comment.js';
import { defineLot } from './define-lot.js';
import { defineUser } from './define-user.js';

export const defineModels = (sequelize) => {
  const Bid = defineBid(sequelize);
  const Category = defineCategory(sequelize);
  const Comment = defineComment(sequelize);
  const Lot = defineLot(sequelize);
  const User = defineUser(sequelize);

  Category.hasMany(Lot, { foreignKey: 'categoryId', as: 'lots' });
  Lot.belongsTo(Category, {
    foreignKey: {
      name: 'categoryId',
      allowNull: false,
    },
    as: 'category',
  });

  Lot.hasMany(Bid, { foreignKey: 'lotId', as: 'bids' });
  Bid.belongsTo(Lot, { foreignKey: 'lotId', as: 'lot' });

  Lot.hasMany(Comment, { foreignKey: 'lotId', as: 'comments' });
  Comment.belongsTo(Lot, { foreignKey: 'lotId', as: 'lot' });

  User.hasMany(Lot, { foreignKey: 'userId', as: 'lots' });
  Lot.belongsTo(User, { foreignKey: 'userId', as: 'user' });

  User.hasMany(Bid, { foreignKey: 'userId', as: 'bids' });
  Bid.belongsTo(User, { foreignKey: 'userId', as: 'user' });

  User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });
  Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' });

  return { Bid, Category, Comment, Lot, User };
};
