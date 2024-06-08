import { Pool, PoolConfig } from 'pg';

import { IDatabaseService } from '../../framework';

export class DatabaseService implements IDatabaseService {
  private static instance: DatabaseService;
  private pool: Pool;

  private constructor(config?: PoolConfig) {
    this.pool = new Pool(config);
  }

  public static getInstance(config?: PoolConfig): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService(config);
    }

    return DatabaseService.instance;
  }

  public getDB(): Pool {
    return this.pool;
  }
}
