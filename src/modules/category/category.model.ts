import { DatabaseService } from '../../common';

export class CategoryModel {
  public async getAllCategories() {
    const databaseService = DatabaseService.getInstance();

    const sql = `SELECT
      category_name as category
    FROM category`;

    const { rows } = await databaseService.query(sql);
    return rows.map((item) => item.category);
  }

  public async getIdByName(name: string) {
    const databaseService = DatabaseService.getInstance();

    const sql = `SELECT
      category_id as id
    FROM category
    WHERE category_name = $1`;

    const { rows } = await databaseService.query(sql, [name]);
    return rows[0].id;
  }
}
