import { Id } from '../../common';
import { BaseQuery } from '../../framework/base.query';

export class LotQuery extends BaseQuery {
  public getLotById(): string {
    this.where = 'WHERE table_name.id = $1';

    return this.getSql();
  }

  public getLotsByText(): string {
    this.where =
      "WHERE ts @@ phraseto_tsquery('english', $1) AND table_name.end_date > NOW()";
    this.setOrder('table_name.create_date DESC');

    return this.getSql();
  }

  public getLotsByCategory(): string {
    this.where = 'WHERE category_name = $1 AND table_name.end_date > NOW()';
    this.setOrder('table_name.create_date DESC');

    return this.getSql();
  }

  public getUnfinished(): string {
    this.where = 'WHERE table_name.end_date > NOW()';
    this.setOrder('table_name.create_date DESC');

    return this.getSql();
  }

  public getLotsByIds(ids: Id[]): string {
    const placeholders = LotQuery.createPlaceholders(ids.length);

    this.where = `WHERE table_name.id IN (${placeholders})`;
    this.setOrder('table_name.create_date DESC');

    return this.getSql();
  }

  protected initSql(): void {
    const tableName = this.model.getTableName();

    this.select = `SELECT
      table_name.id AS id,
      user_id AS "userId",
      title,
      lot_description AS description,
      image_url AS "imageUrl",
      price,
      step,
      end_date AS "endDate",
      category_name AS category`;
    this.from = `FROM ${tableName} AS table_name`;
    this.join = 'JOIN categories ON table_name.category_id = categories.id';
  }
}
