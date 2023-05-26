import { Id, Timestamp } from '../../common';
import { BaseModel } from '../../framework';
import { CategoryModel } from '../category';
import { CreateLot, Lot, LotId } from './interfaces';
import { LotQuery } from './lot.query';

export class LotModel extends BaseModel {
  protected tableName = 'lots';
  protected queryBuilder: LotQuery = new LotQuery(this);

  public id: Id = '';
  public userId = '';
  public title = '';
  public description = '';
  public imageUrl = '';
  public price = 0;
  public step = 0;
  public endDate: Timestamp = '';
  public category = '';

  public initSql(): string {
    return this.queryBuilder.getLotById();
  }

  public async getLotsByText(text: string): Promise<Lot[]> {
    const sql = this.queryBuilder.getLotsByText();

    const lots = await this.getScalarValues<Lot>(sql, [text]);
    return lots;
  }

  public async getLotsByCategory(category: string): Promise<Lot[]> {
    const sql = this.queryBuilder.getLotsByCategory();

    const lots = await this.getScalarValues<Lot>(sql, [category]);
    return lots;
  }

  public async addLot(createLot: CreateLot, userId: string): Promise<LotId> {
    const rows = [
      'category_id',
      'user_id',
      'title',
      'image_url',
      'lot_description',
      'price',
      'step',
      'end_date',
    ];

    const fields = LotQuery.createFields(rows);
    const placeholders = LotQuery.createPlaceholders(rows.length);

    const categoryModel = this.modelFactoryService.getEmptyModel(CategoryModel);
    const { category, description, endDate, imageUrl, title, price, step } =
      createLot;

    const { id: categoryId } = await categoryModel.getIdByCategoryName(
      category,
    );

    const sql = `INSERT INTO
      lots (${fields})
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
