import { DataTypes, Model } from 'sequelize';

class User extends Model {}

export const defineUser = (sequelize) => {
  return User.init(
    {
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      username: {
        type: DataTypes.STRING(32),
        allowNull: false,
        unique: true,
      },
      passwordHash: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true,
    },
  );
};
