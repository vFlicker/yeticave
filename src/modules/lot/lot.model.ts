import { createPlaceholders, Id, Timestamp } from '../../common';
import { BaseModel } from '../../framework';
import { CategoryModel } from '../category';
import { CreateLot, Lot, LotId } from './interfaces';
import { LotQuery } from './lot.query';

export class LotModel extends BaseModel {
  protected tableName = 'lot';

  public id: Id = '';
  public title = '';
  public description = '';
  public imageUrl = '';
  public price = 0;
  public step = 0;
  public endDate: Timestamp = '';
  public category = '';

  private queryBuilder = new LotQuery(this);

  public getQuery(): LotQuery {
    return this.queryBuilder;
  }

  public initSql(): string {
    return this.queryBuilder.getLotById();
  }

  public async getLotsByText(text: string): Promise<Lot[]> {
    const sql = this.queryBuilder.getLotsByText();

    const lots = this.getScalarValues<Lot>(sql, [text]);
    return lots;
  }

  public async getLotsByCategory(category: string): Promise<Lot[]> {
    const sql = this.queryBuilder.getLotsByCategory();

    const lots = this.getScalarValues<Lot>(sql, [category]);
    return lots;
  }

  public async addLot(createLot: CreateLot, userId: string): Promise<LotId> {
    // TODO: look at this function
    const length = Object.keys(createLot).length + 1;
    const placeholders = createPlaceholders(length);

    // TODO: is it need here?
    const categoryModel = this.modelFactoryService.getEmptyModel(CategoryModel);
    const { category, description, endDate, imageUrl, title, price, step } =
      createLot;

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

    const lotId = await this.getScalarValue<LotId>(sql, [
      categoryId,
      userId,
      title,
      imageUrl,
      description,
      price,
      step,
      endDate,
    ]);

    return lotId;
  }
}
