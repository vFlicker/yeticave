import { DataTypes, Model } from 'sequelize';

class Lot extends Model {}

export const defineLot = (sequelize) => {
  return Lot.init(
    {
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      startingPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      currentPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      finishedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Lot',
      tableName: 'lots',
      timestamps: true,
    },
  );
};
