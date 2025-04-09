const { DataTypes, Model } = require('sequelize');

class Inventory extends Model {}

exports.init = function (sequelize) {
  return Inventory.init(
    {
      product_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'products', key: 'id' } },
      stock_level: { type: DataTypes.INTEGER, allowNull: false },
      location: { type: DataTypes.TEXT },
      download_url: { type: DataTypes.TEXT },
    },
    {
      tableName: 'inventory',
      underscored: true,
      sequelize,
    }
  );
};