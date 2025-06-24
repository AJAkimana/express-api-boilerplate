import { Sequelize } from 'sequelize';

const env = process.env.NODE_ENV || 'develop';
const { username, password, database, ...configs } =
  require('../configs/env-config')[env] || {};

export const sequelize = new Sequelize(database, username, password, configs);

export async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    // Comment out the next line if you don't want to alter the tables automatically
    // This is useful for development but should be used with caution in production
    // If you want to reset the database, you can use { force: true } instead
    // await sequelize.sync({ force: true });
    await sequelize.sync({ alter: true }); // or { force: true } for dev
    console.log('Database connected!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
