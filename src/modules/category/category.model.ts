import { BaseModel } from '../../framework';
import { CategoryQuery } from './category.query';
import { Categories, Category } from './interfaces';

export class CategoryModel extends BaseModel {
  protected tableName = 'categories';
  protected queryBuilder: CategoryQuery = new CategoryQuery(this);

  public async getAllCategories(): Promise<string[]> {
    const sql = `SELECT
      array_agg(category_name) AS categories
    FROM
      categories`;

    const { categories } = await this.getScalarValue<Categories>(sql);
    return categories;
  }

  public async getIdByCategoryName(name: string): Promise<Category> {
    const sql = this.queryBuilder.getIdByCategoryName();

    const category = this.getScalarValue<Category>(sql, [name]);
    return category;
  }
}
