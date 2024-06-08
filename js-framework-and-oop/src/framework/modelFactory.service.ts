import { BaseModel } from './base.model';
import { IDatabaseService } from './interfaces';
import { ExtendedModel } from './types';

export class ModelFactoryService {
  private static instance: ModelFactoryService;
  protected databaseService: IDatabaseService;

  private constructor(databaseService: IDatabaseService) {
    this.databaseService = databaseService;
  }

  public static getInstance(
    databaseService: IDatabaseService,
  ): ModelFactoryService {
    if (!ModelFactoryService.instance) {
      ModelFactoryService.instance = new ModelFactoryService(databaseService);
    }

    return ModelFactoryService.instance;
  }

  public getEmptyModel<T extends BaseModel>(className: ExtendedModel<T>): T {
    const model = new className(this.databaseService, this);
    return model as T;
  }

  public async load<T extends BaseModel>(
    className: ExtendedModel<T>,
    id: string,
  ): Promise<T> {
    try {
      const model = new className(this.databaseService, this);
      const db = this.databaseService.getDB();

      const { rows } = await db.query(model.initSql(), [id]);

      model.load(rows[0]);

      return model;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  public async getAllByQuery<T extends BaseModel>(
    className: ExtendedModel<T>,
    sql: string,
    parameters: (string | number)[],
  ): Promise<T[]> {
    const { rows } = await this.databaseService.getDB().query(sql, parameters);

    const instances = rows.map((row) => {
      const model = new className(this.databaseService, this);
      const instance = model.load(row);
      return instance;
    });

    return instances;
  }
}
