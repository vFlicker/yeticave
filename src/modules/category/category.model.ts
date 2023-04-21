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
}
