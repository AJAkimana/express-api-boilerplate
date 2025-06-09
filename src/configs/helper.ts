import { sequelize } from './database';

export async function bootstrap() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true }); // or { force: true } for dev
    console.log('Database connected!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
