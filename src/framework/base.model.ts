import { BaseQuery } from './base.query';
import { IDatabaseService } from './interfaces';
import { ModelFactoryService } from './modelFactory.service';

export class BaseModel {
  [key: string]: unknown;

  public databaseService: IDatabaseService;
  protected modelFactoryService: ModelFactoryService;

  // TODO: can i remove one of this methods?
  protected tableName = '';
  public static tableName = '';

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

  public async getScalarValue<T>(sql: string): Promise<T> {
    const { rows } = await this.databaseService.getDB().query(sql);

    const result = rows[0];
    return result;
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

  public getQuery(): BaseQuery | null {
    return null;
  }

  public initSql(): string {
    const sql = `SELECT * FROM ${this.tableName} WHERE id = $1 LIMIT 1`;
    return sql;
  }
}
