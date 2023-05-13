import { BaseModel } from './base.model';
import { BaseQuery } from './base.query';
import { ModelFactoryService } from './modelFactory.service';

type QueryMethod = (...params: any[]) => string;
type Count = { count: number };

const NUMBER_ITEMS_PER_PAGE = 6;

export class PaginatorService<T extends BaseModel> {
  protected totalResults = 1;
  protected totalPages = 1;
  protected itemsPerPage = NUMBER_ITEMS_PER_PAGE;
  protected currentPage = 1;
  protected items: T[] = [];
  protected modelFactory: ModelFactoryService;
  protected model: T;
  protected query: BaseQuery | null;

  constructor(modelFactory: ModelFactoryService, model: T) {
    this.modelFactory = modelFactory;
    this.model = model;
    this.query = model.getQuery();
  }

  public getItemsPerPage(): number {
    return this.itemsPerPage;
  }

  public setItemsPerPage(itemsPerPage: number): this {
    this.itemsPerPage = itemsPerPage;
    return this;
  }

  public isLastPage(): boolean {
    return this.currentPage === this.totalPages;
  }

  public getCurrentPage(): number {
    return this.currentPage;
  }

  public setCurrentPage(currentPage: number): this {
    this.currentPage = currentPage;
    return this;
  }

  public getTotalResults(): number {
    return this.totalResults;
  }

  public getTotalPages(): number {
    return this.totalPages;
  }

  public getItems(): T[] {
    return this.items;
  }

  public async init(
    methodName: string,
    parameters: (string | number)[] = [],
  ): Promise<void> {
    if (this.query && typeof this.query[methodName] === 'function') {
      const countSql = this.query.getCountSql();
      const { count } = await this.model.getScalarValue<Count>(countSql);
      const offset = (this.currentPage - 1) * this.itemsPerPage;

      this.totalResults = Number(count);

      console.log(this.totalResults);

      this.totalPages = Math.ceil(this.totalResults / this.itemsPerPage);

      this.query.setOffset(offset);
      this.query.setLimit(this.itemsPerPage);

      const query = this.query[methodName] as QueryMethod;
      query.apply(this.query);

      const sql = this.query.getSql();

      const items = await this.modelFactory.getAllByQuery(
        this.model,
        sql,
        parameters,
      );

      this.items = items;
    }
  }

  public getPagesNumbers(limit = 5): number[] {
    const half = Math.floor(limit / 2);
    const start = this.currentPage - half;
    const end = this.currentPage + half;
    const totalPages = this.totalPages;

    if (totalPages <= limit) {
      const allPages = this.getAllPages();
      return allPages;
    }

    if (start < 1) {
      const someFirstAndOneLastPages = this.getSomeFirstAndOneLastPages(limit);
      return someFirstAndOneLastPages;
    }

    if (end > totalPages) {
      const oneFirstAndSomeLastPages = this.getOneFirstAndSomeLastPages(limit);
      return oneFirstAndSomeLastPages;
    }

    const middlePages = this.getMiddlePages(limit, start);
    return middlePages;
  }

  private getAllPages(): number[] {
    const callback = (index: number) => index + 1;
    const pageNumbers = this.getPageNumbers(this.totalPages, callback);
    return pageNumbers;
  }

  private getSomeFirstAndOneLastPages(limit: number): number[] {
    const length = limit - 1;
    const callback = (index: number) => index + 1;
    const someFirstPages = this.getPageNumbers(length, callback);
    return [...someFirstPages, this.totalPages];
  }

  private getOneFirstAndSomeLastPages(limit: number): number[] {
    const length = limit - 1;
    const callback = (index: number) => this.totalPages - length + index + 1;
    const someLastPages = this.getPageNumbers(length, callback);
    return [1, ...someLastPages];
  }

  private getMiddlePages(limit: number, start: number): number[] {
    const length = limit - 2;
    const callback = (index: number) => start + index + 1;
    const pages = this.getPageNumbers(length, callback);
    return [1, ...pages, this.totalPages];
  }

  private getPageNumbers(
    length: number,
    callback: (index: number) => number,
  ): number[] {
    return Array.from({ length }, (_, index) => callback(index));
  }
}
