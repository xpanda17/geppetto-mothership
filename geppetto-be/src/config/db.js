import 'dotenv/config';
import { Sequelize } from 'sequelize';

const DATABASE_URL = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}:${process.env.CONTAINER_DB_PORT}/${process.env.DB_NAME}`;
const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

export default sequelize;

