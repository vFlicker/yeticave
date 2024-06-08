import { BaseQuery } from '../../framework/base.query';

export class BetQuery extends BaseQuery {
  protected initSql(): void {
    const tableName = this.model.getTableName();

    this.select = `SELECT *`;
    this.from = `FROM ${tableName} AS table_name`;
  }
}
