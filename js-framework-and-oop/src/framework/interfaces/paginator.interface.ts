import { BaseModel } from '../base.model';

export interface IPaginatorService<T extends BaseModel> {
  getItemsPerPage(): number;
  setItemsPerPage(itemsPerPage: number): this;
  isLastPage(): boolean;
  setUri(uri: string): this;
  getUri(): string | null;
  getUrl(page: number): string;
  getCurrentPage(): number;
  setCurrentPage(currentPage: number): this;
  getTotalResults(): number;
  getTotalPages(): number;
  getItems(): T[];
  init(methodName: string, parameters?: (string | number)[]): Promise<void>;
  getPagesNumbers(limit?: number): number[];
}
