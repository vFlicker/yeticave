import dotenv from 'dotenv';

dotenv.config();

export const databaseConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
  port: Number(process.env.DB_PORT),
};
