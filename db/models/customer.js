const { DataTypes, Model } = require('sequelize');

class Customer extends Model {}

exports.init = function (sequelize) {
  return Customer.init(
    {
      email: { type: DataTypes.TEXT, allowNull: false, unique: true },
      name: { type: DataTypes.TEXT, allowNull: false },
      lifetime_value: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    {
      tableName: 'customers',
      underscored: true,
      sequelize,
    }
  );
};