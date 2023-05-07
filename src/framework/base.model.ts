import { IDatabaseService } from './interfaces';
import { ModelFactoryService } from './modelFactory.service';

export class BaseModel {
  [key: string]: unknown;

  public databaseService: IDatabaseService | null = null;
  protected modelFactoryService: ModelFactoryService | null = null;

  public static tableName: string;

  // public load<T extends object>(data: T): this {
  //   for (const [key, value] of Object.entries(data)) {
  //     this[key] = value;
  //   }

  //   return this;
  // }
  public load(data: object): this {
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
}