import { createPlaceholders, DatabaseService, Id } from '../../common';
import { CategoryModel } from '../category/category.model';

type Lot = {
  name: string;
  category: string;
  description: string;
  image: string;
  price: number;
  step: number;
  endDate: string;
};

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

  public async getLotsByText(text: string) {
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
    WHERE ts @@ phraseto_tsquery('english', $1)
    ORDER BY create_date DESC`;

    const { rows } = await databaseService.query(sql, [text]);
    return rows;
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

    const placeholders = createPlaceholders(ids.length);

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

  public async addLot(lot: Lot, userId: string): Promise<Id> {
    const databaseService = DatabaseService.getInstance();

    const length = Object.keys(lot).length + 1;
    const placeholders = createPlaceholders(length);

    const categoryModel = new CategoryModel();
    const { category, description, endDate, image, name, price, step } = lot;
    const categoryId = await categoryModel.getIdByName(category);

    const sql = `INSERT INTO
      lot (
        category_id,
        user_id,
        title,
        image_url,
        lot_description,
        price,
        step,
        end_date
      )
    VALUES
      (${placeholders})
    RETURNING lot_id`;

    // TODO: handle errors
    const { rows } = await databaseService.query(sql, [
      categoryId,
      userId,
      name,
      image,
      description,
      price,
      step,
      endDate,
    ]);

    return rows[0].lot_id as Id;
  }
}
