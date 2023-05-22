import { BaseModel } from '../../framework';
import { CategoryQuery } from './category.query';
import { Category } from './interfaces';

export class CategoryModel extends BaseModel {
  protected tableName = 'category';

  private queryBuilder = new CategoryQuery(this);

  public getQuery(): CategoryQuery {
    return this.queryBuilder;
  }

  public async getAllCategories(): Promise<Category[]> {
    const sql = this.queryBuilder.getAllCategories();

    const categories = await this.getScalarValues<Category>(sql);
    return categories;
  }

  public async getIdByCategoryName(name: string): Promise<Category> {
    const sql = this.queryBuilder.getIdByCategoryName();

    const category = this.getScalarValue<Category>(sql, [name]);
    return category;
  }
}
