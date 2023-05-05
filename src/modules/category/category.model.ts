import { DatabaseService } from '../../common';
import { BaseModel } from '../../framework';

export class CategoryModel extends BaseModel {
  public async getAllCategories() {
    const databaseService = DatabaseService.getInstance();

    const sql = `SELECT
      category_name as category
    FROM category`;

    const { rows } = await databaseService.getDB().query(sql);
    return rows.map((item) => item.category);
  }

  public async getIdByName(name: string) {
    const databaseService = DatabaseService.getInstance();

    const sql = `SELECT
      category_id as id
    FROM category
    WHERE category_name = $1`;

    const { rows } = await databaseService.getDB().query(sql, [name]);
    return rows[0].id;
  }
}
