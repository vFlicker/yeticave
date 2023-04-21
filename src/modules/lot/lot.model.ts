import { DatabaseService, Id } from '../../common';

export class LotModel {
  public async getLotById(id: Id) {
    const databaseService = DatabaseService.getInstance();

    const sql = `SELECT
      lot_id as id,
      title,
      lot_description as description,
      image_url as "imageUrl",
      price,
      step,
      end_date as "endDate",
      category_name as category
    FROM
      lot
    INNER JOIN category USING(category_id)
    WHERE lot_id = $1`;

    const { rows } = await databaseService.query(sql, [id]);
    return rows[0];
  }

  public async getLotsByCategory(category: string) {
    const databaseService = DatabaseService.getInstance();

    const sql = `SELECT
      lot_id as id,
      title,
      lot_description as description,
      image_url as "imageUrl",
      price,
      step,
      end_date as "endDate",
      category_name as category
    FROM
      lot
    INNER JOIN category USING(category_id)
    WHERE category_name = $1
    ORDER BY create_date DESC`;

    const { rows } = await databaseService.query(sql, [category]);
    return rows;
  }

  public async getLotsByIds(ids: Id[]) {
    const databaseService = DatabaseService.getInstance();

    // TODO: move to utils
    const placeholders = ids.map((_, index) => `$${index + 1}`).join(', ');

    const sql = `SELECT
      lot_id as id,
      title,
      lot_description as description,
      image_url as "imageUrl",
      price,
      step,
      end_date as "endDate",
      category_name as category
    FROM
      lot
    INNER JOIN category USING(category_id)
    WHERE lot_id IN (${placeholders})
    ORDER BY create_date DESC`;

    const { rows } = await databaseService.query(sql, ids);
    return rows;
  }

  public async getUnfinishedLots() {
    const databaseService = DatabaseService.getInstance();

    const sql = `SELECT
      lot_id as id,
      title,
      lot_description as description,
      image_url as "imageUrl",
      price,
      step,
      end_date as "endDate",
      category_name as category
    FROM
      lot
    INNER JOIN category USING(category_id)
    WHERE end_date > NOW()
    ORDER BY create_date DESC`;

    const { rows } = await databaseService.query(sql);
    return rows;
  }
}
