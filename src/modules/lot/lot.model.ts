import { createPlaceholders, Id, Timestamp } from '../../common';
import { BaseModel } from '../../framework';
import { CategoryModel } from '../category';
import { Lot, LotId } from './interfaces';
import { LotQuery } from './lot.query';

export class LotModel extends BaseModel {
  static tableName = 'lot';
  protected tableName = 'lot';

  public id?: Id;
  public title?: string;
  public description?: string;
  public imageUrl?: string;
  public price?: number;
  public step?: number;
  public endDate?: Timestamp;
  public category?: string;

  private queryBuilder = new LotQuery(this);

  public getQuery(): LotQuery {
    return this.queryBuilder;
  }

  public initSql(): string {
    return this.queryBuilder.getLotById();
  }

  public async getLotsByText(text: string): Promise<Lot[]> {
    const sql = this.queryBuilder.getLotsByText();

    const { rows } = await this.databaseService.getDB().query(sql, [text]);
    return rows;
  }

  public async getLotsByCategory(category: string): Promise<Lot[]> {
    const sql = this.queryBuilder.getLotsByCategory();

    const { rows } = await this.databaseService.getDB().query(sql, [category]);
    return rows;
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
    RETURNING "id"`;

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
}
