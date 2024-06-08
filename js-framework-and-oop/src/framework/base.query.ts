import { BaseModel } from './base.model';

export abstract class BaseQuery {
  [key: string]: unknown;

  protected model: BaseModel;
  protected select?: string;
  protected where?: string;
  protected from?: string;
  protected join?: string;
  protected offset?: number;
  protected limit?: number;
  protected order?: string;
  protected sql = '';

  constructor(model: BaseModel) {
    this.model = model;
    this.initSql();
  }

  public setOffset(offset: number): void {
    this.offset = offset;
  }

  public setLimit(limit: number): void {
    this.limit = limit;
  }

  public setOrder(order: string): void {
    this.order = `ORDER BY ${order}`;
  }

  public getSql(
    withLimit = true,
    replace: Record<string, string> = {},
  ): string {
    const parts = {
      select: this.select,
      from: this.from,
      join: this.join,
      where: this.where,
      order: this.order,
    } as Record<string, string>;

    const replacedParts = { ...parts, ...replace };

    if (withLimit) {
      replacedParts.limit = this.getLimitSql();
    }

    const sql = Object.values(replacedParts).filter(Boolean).join(' ');
    return sql;
  }

  public getCountSql(): string {
    const select = 'SELECT COUNT(table_name.id)';
    const order = '';

    return this.getSql(false, { select, order });
  }

  protected getLimitSql(): string {
    let sql = '';

    if (this.limit !== undefined && this.offset !== undefined) {
      sql = `LIMIT ${this.limit} OFFSET ${this.offset}`;
    }

    return sql;
  }

  protected abstract initSql(): void;

  static createPlaceholders(length: number) {
    return Array.from({ length }, (_, index) => `$${index + 1}`).join(', ');
  }

  static createFields(fields: string[]) {
    return fields.join(', ');
  }
}
