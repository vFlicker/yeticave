import dotenv from 'dotenv';
import { Pool, QueryConfig, QueryResult } from 'pg';

dotenv.config();

export class DatabaseService {
  private static instance: DatabaseService;
  private pool: Pool;

  private constructor() {
    this.pool = new Pool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE_NAME,
      port: Number(process.env.DB_PORT),
    });
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }

    return DatabaseService.instance;
  }

  public async query(
    text: string | QueryConfig<any>,
    params?: any,
  ): Promise<QueryResult<any>> {
    const res = await this.pool.query(text, params);
    return res;
  }
}
