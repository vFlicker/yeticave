import { BaseModel } from '../../framework';
import { CategoryQuery } from './category.query';
import { Category } from './interfaces';

export class CategoryModel extends BaseModel {
  protected tableName = 'category';

  private queryBuilder = new CategoryQuery(this);

  public async getAllCategories(): Promise<Category[]> {
    const sql = this.queryBuilder.getAllCategories();

    const { rows } = await this.databaseService.getDB().query<Category>(sql);
    return rows;
  }

  public async getIdByCategoryName(name: string): Promise<Category> {
    const sql = this.queryBuilder.getIdByCategoryName();

    const { rows } = await this.databaseService
      .getDB()
      .query<Category>(sql, [name]);
    return rows[0];
  }

  public getQuery(): CategoryQuery {
    return this.queryBuilder;
  }
}
