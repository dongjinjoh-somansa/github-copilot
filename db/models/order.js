const { DataTypes, Model } = require('sequelize');

class Order extends Model {}

exports.init = function (sequelize) {
  return Order.init(
    {
      number: { type: DataTypes.TEXT, allowNull: false, unique: true },
      total: { type: DataTypes.INTEGER, allowNull: false },
      date: { type: DataTypes.DATE, allowNull: false },
      status: { type: DataTypes.TEXT, allowNull: false },
      transaction_id: { type: DataTypes.TEXT },
    },
    {
      tableName: 'orders',
      underscored: true,
      sequelize,
    }
  );
};