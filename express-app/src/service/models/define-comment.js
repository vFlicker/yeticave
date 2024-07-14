import { DataTypes, Model } from 'sequelize';

class Comment extends Model {}

export const defineComment = (sequelize) => {
  return Comment.init(
    {
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Comment',
      tableName: 'comments',
      timestamps: true,
    },
  );
};
