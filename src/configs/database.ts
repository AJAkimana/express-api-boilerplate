import { Sequelize } from 'sequelize';

const env = process.env.NODE_ENV || 'develop';
const { username, password, database, ...configs } =
  require('../configs/envConfig')[env] || {};

export const sequelize = new Sequelize(database, username, password, configs);
