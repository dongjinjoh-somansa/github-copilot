const { Sequelize } = require('sequelize');
require('dotenv').config();

const env = process.env.NODE_ENV || 'development';

const config = {
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
  },
  development: {
    dialect: 'sqlite',
    storage: './sequelize/database.sqlite',
  },
  production: {
    dialect: 'postgres',
    url: process.env.DATABASE_URL,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};

const sequelize =
  env === 'production'
    ? new Sequelize(process.env.DATABASE_URL, config.production)
    : new Sequelize(config[env]);

// Initialize models
const Product = require('./product').init(sequelize);
const Inventory = require('./inventory').init(sequelize);
const Order = require('./order').init(sequelize);
const Customer = require('./customer').init(sequelize);

// Associations
// Example: Product.hasMany(Inventory);

const DB = {
  close() {
    sequelize.close();
  },
  async sync() {
    await sequelize.sync({ force: true });
    return 'DONE';
  },
  async run(sql, opts = {}) {
    return sequelize.query(sql, opts);
  },
  async query(sql) {
    return sequelize.query(sql, { type: sequelize.QueryTypes.SELECT });
  },
};

module.exports = {
  DB,
  Product,
  Inventory,
  Order,
  Customer,
};