import { BaseModel } from './base.model';
import { IPaginatorService } from './interfaces';
import { ModelFactoryService } from './modelFactory.service';
import { ExtendedModel } from './types';

type QueryMethod = (...params: any[]) => string;
type Count = { count: number };

const NUMBER_ITEMS_PER_PAGE = 6;

export class PaginatorService<T extends BaseModel>
  implements IPaginatorService<T>
{
  protected totalResults = 1;
  protected totalPages = 1;
  protected itemsPerPage = NUMBER_ITEMS_PER_PAGE;
  protected currentPage = 1;
  protected uri: string | null = '';
  protected items: T[] = [];
  protected modelFactory: ModelFactoryService;
  protected className: ExtendedModel<T>;

  constructor(modelFactory: ModelFactoryService, className: ExtendedModel<T>) {
    this.modelFactory = modelFactory;
    this.className = className;
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

  public setUri(uri: string): this {
    this.uri = uri;
    return this;
  }

  public getUri(): string | null {
    return this.uri;
  }

  public getUrl(page: number): string {
    const uri = this.getUri();

    if (!uri) throw new Error('Uri was not set');

    const searchParams = new URLSearchParams(uri.slice(1));
    searchParams.set('page', page.toString());

    return `?${searchParams.toString()}`;
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
    const model = this.modelFactory.getEmptyModel(this.className) as T;
    const queryBuilder = model.getQuery();

    if (queryBuilder && typeof queryBuilder[methodName] === 'function') {
      const countSql = queryBuilder.getCountSql();
      const { count } = await model.getScalarValue<Count>(countSql);
      const offset = (this.currentPage - 1) * this.itemsPerPage;

      this.totalResults = Number(count);
      this.totalPages = Math.ceil(this.totalResults / this.itemsPerPage);

      queryBuilder.setOffset(offset);
      queryBuilder.setLimit(this.itemsPerPage);

      const query = queryBuilder[methodName] as QueryMethod;
      query.call(queryBuilder, parameters);

      const sql = queryBuilder.getSql();

      const items = (await this.modelFactory.getAllByQuery(
        this.className,
        sql,
        parameters,
      )) as T[];

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
