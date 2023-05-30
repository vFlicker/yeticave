import { BaseQuery } from '../../framework/base.query';

export class CategoryQuery extends BaseQuery {
  public getIdByCategoryName(): string {
    this.where = `WHERE category_name = $1`;

    return this.getSql();
  }

  protected initSql(): void {
    const tableName = this.model.getTableName();

    this.select = `SELECT
      id,
      category_name AS name`;
    this.from = `FROM ${tableName} AS table_name`;
  }
}
