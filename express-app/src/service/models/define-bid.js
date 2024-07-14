import { DataTypes, Model } from 'sequelize';

class Bid extends Model {}

export const defineBid = (sequelize) => {
  return Bid.init(
    {
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Bid',
      tableName: 'bids',
      timestamps: true,
    },
  );
};
