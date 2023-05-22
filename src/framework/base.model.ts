import { BaseQuery } from './base.query';
import { IDatabaseService } from './interfaces';
import { ModelFactoryService } from './modelFactory.service';

export class BaseModel {
  [key: string]: unknown;

  public databaseService: IDatabaseService;

  protected tableName = '';
  protected modelFactoryService: ModelFactoryService;

  constructor(
    databaseService: IDatabaseService,
    modelFactoryService: ModelFactoryService,
  ) {
    this.databaseService = databaseService;
    this.modelFactoryService = modelFactoryService;
  }

  public getTableName(): string {
    return this.tableName;
  }

  // TODO: return this.queryBuilder.
  public getQuery(): BaseQuery | null {
    return null;
  }

  public async getScalarValue<T>(
    sql: string,
    data: (string | number)[] = [],
  ): Promise<T> {
    const { rows } = await this.databaseService.getDB().query(sql, data);

    const result = rows[0];
    return result;
  }

  public async getScalarValues<T>(
    sql: string,
    data: (string | number)[] = [],
  ): Promise<T[]> {
    const { rows } = await this.databaseService.getDB().query(sql, data);
    return rows;
  }

  public async runSimpleQuery(
    sql: string,
    data: (string | number)[] = [],
  ): Promise<void> {
    await this.databaseService.getDB().query(sql, data);
  }

  public load(data: Record<string, any>): this {
    for (const [key, value] of Object.entries(data)) {
      this[key] = value;
    }

    return this;
  }

  public setDb(databaseService: IDatabaseService): this {
    this.databaseService = databaseService;
    return this;
  }

  public setModelFactory(modelFactoryService: ModelFactoryService): this {
    this.modelFactoryService = modelFactoryService;
    return this;
  }

  public initSql(): string {
    const sql = `SELECT * FROM ${this.tableName} WHERE id = $1 LIMIT 1`;
    return sql;
  }
}
