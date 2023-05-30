import { Pool } from 'pg';

export interface IDatabaseService {
  getDB(): Pool;
}
