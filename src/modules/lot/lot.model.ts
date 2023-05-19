import { createPlaceholders, Id } from '../../common';
import { BaseModel } from '../../framework';
import { CategoryModel } from '../category';
import { Lot, LotCount, LotId } from './interfaces';
import { LotQuery } from './lot.query';

export class LotModel extends BaseModel {
  protected tableName = 'lot';

  private queryBuilder = new LotQuery(this);

  public async getLotById(id: Id): Promise<Lot> {
    const sql = `SELECT
      lot_id AS id,
      title,
      lot_description AS description,
      image_url AS "imageUrl",
      price,
      step,
      end_date AS "endDate",
      category_name AS category
    FROM
      lot
    INNER JOIN category USING(category_id)
    WHERE lot_id = $1`;

    const { rows } = await this.databaseService.getDB().query(sql, [id]);
    return rows[0];
  }

  public async getLotsByText(text: string): Promise<Lot[]> {
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

    const { rows } = await this.databaseService.getDB().query(sql, [text]);
    return rows;
  }

  public async getLotsByCategory(category: string): Promise<Lot[]> {
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

    const { rows } = await this.databaseService.getDB().query(sql, [category]);
    return rows;
  }

  public async getLotsByIds(ids: Id[]): Promise<Lot[]> {
    // TODO: look at this function
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

    const { rows } = await this.databaseService.getDB().query(sql, ids);
    return rows;
  }

  public async getUnfinishedLotsCount(): Promise<LotCount> {
    const sql = `SELECT
      COUNT(*) as count
    FROM
      lot
    WHERE end_date > NOW()`;

    const { rows } = await this.databaseService.getDB().query(sql);
    return rows[0];
  }

  public async addLot(lot: Lot, userId: string): Promise<LotId> {
    // TODO: look at this function
    const length = Object.keys(lot).length + 1;
    const placeholders = createPlaceholders(length);

    const categoryModel = this.modelFactoryService.getEmptyModel(CategoryModel);
    const { category, description, endDate, imageUrl, name, price, step } = lot;

    const { id: categoryId } = await categoryModel.getIdByCategoryName(
      category,
    );

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
    RETURNING lot_id AS "id"`;

    // TODO: handle errors
    const { rows } = await this.databaseService
      .getDB()
      .query(sql, [
        categoryId,
        userId,
        name,
        imageUrl,
        description,
        price,
        step,
        endDate,
      ]);

    return rows[0];
  }

  public getQuery(): LotQuery {
    return this.queryBuilder;
  }
}
