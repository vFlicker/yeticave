import { BaseQuery } from '../../framework/base.query';

export class UserQuery extends BaseQuery {
  public getUserByEmail(): string {
    this.where = 'WHERE email = $1::text';

    return this.getSql();
  }

  protected initSql(): void {
    const tableName = this.model.getTableName();

    this.select = `SELECT
      id,
      email,
      user_name AS name,
      user_password AS password,
      avatar_url AS "avatarUrl",
      contacts`;
    this.from = `FROM ${tableName} AS table_name`;
  }
}
