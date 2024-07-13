import { DataTypes, Model } from 'sequelize';

class Category extends Model {}

export const defineCategory = (sequelize) => {
  return Category.init(
    {
      name: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Category',
      tableName: 'categories',
      timestamps: false,
    },
  );
};
