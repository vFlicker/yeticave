const ITEMS_PER_PAGE = 6;
const DEFAULT_OFFSET = 0;

class PaginatorError extends Error {
  constructor(message) {
    super(message);
    this.name = 'PaginatorError';
  }
}

export class Paginator {
  #page = null;
  #limit = null;
  #data = null;
  #uri = null;

  constructor(page, limit = ITEMS_PER_PAGE) {
    this.#page = page || 1;
    this.#limit = limit;
  }

  getPagination() {
    const offset = (this.#page - 1) * this.#limit;
    return { limit: this.#limit, offset };
  }

  setData(data) {
    this.#data = data;
    return this;
  }

  get data() {
    if (!this.#data) {
      throw new PaginatorError('Data is not set');
    }

    return this.#data;
  }

  setUri(uri) {
    this.#uri = uri;
    return this;
  }

  getUrl(pageNumber) {
    if (!this.#uri) {
      throw new PaginatorError('URI is not set');
    }

    const query = this.#uri.match(/\?.*$/);
    const parsedQuery = query ? query[0] : '';
    const searchParams = new URLSearchParams(parsedQuery);

    searchParams.set('page', pageNumber.toString());

    return `?${searchParams.toString()}`;
  }

  get items() {
    return this.data.rows;
  }

  get pagingData() {
    return {
      currentPage: this.#currentPage,
      totalPages: this.#totalPages,
      hasPrev: this.#hasPrev,
      hasNext: this.#hasNext,
      prevPage: this.#prevPage,
      nextPage: this.#nextPage,
    };
  }

  get #totalPages() {
    return Math.ceil(this.data.count / this.#limit);
  }

  get #currentPage() {
    return this.#page ? +this.#page : 1;
  }

  get #hasPrev() {
    return this.#currentPage > 1;
  }

  get #hasNext() {
    return this.#currentPage < this.#totalPages;
  }

  get #prevPage() {
    return this.#hasPrev ? this.#currentPage - 1 : 1;
  }

  get #nextPage() {
    return this.#hasNext ? this.#currentPage + 1 : this.#currentPage;
  }
}
