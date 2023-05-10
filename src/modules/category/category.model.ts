import { BaseModel } from '../../framework';
import { Category } from './interfaces';

export class CategoryModel extends BaseModel {
  public async getAllCategories(): Promise<Category[]> {
    const sql = `SELECT
      category_id AS id,
      category_name AS name
    FROM category`;

    const { rows } = await this.databaseService.getDB().query<Category>(sql);
    return rows;
  }

  public async getIdByCategoryName(name: string): Promise<Category> {
    const sql = `SELECT
      category_id AS id
      category_name AS name
    FROM category
    WHERE category_name = $1`;

    const { rows } = await this.databaseService
      .getDB()
      .query<Category>(sql, [name]);
    return rows[0];
  }
}
