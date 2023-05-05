import { BaseModel } from './base.model';
import { IDatabaseService } from './interfaces';

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

  // public load<T extends BaseModel>(className: typeof BaseModel, id: string): T {
  //   const table = className.tableName;

  //   const sql = `SELECT * FROM ${table} WHERE id = ? LIMIT 1`;
  // }
  public async load(
    className: typeof BaseModel,
    id: string,
  ): Promise<BaseModel> {
    const table = className.tableName;
    const sql = `SELECT * FROM ${table} WHERE id = $1 LIMIT 1`;

    try {
      const db = this.databaseService.getDB();
      const { rows } = await db.query(sql, [id]);

      const model = new className();
      model.load(rows[0]).setDb(this.databaseService).setModelFactory(this);

      return model;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
