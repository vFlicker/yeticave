import { BaseQuery } from '../../framework/base.query';

export class LotQuery extends BaseQuery {
  public getUnfinished(): string {
    this.where = 'WHERE end_date > NOW()';
    this.setOrder('create_date DESC');

    return this.getSql();
  }

  protected initSql(): void {
    const tableName = this.model.getTableName();

    this.select = `SELECT
      lot_id AS id,
      title,
      lot_description AS description,
      image_url AS "imageUrl",
      price,
      step,
      end_date AS "endDate",
      category_name AS category`;
    this.from = `FROM ${tableName} AS table_name`;
    this.join = 'INNER JOIN category USING(category_id)';
  }
}
