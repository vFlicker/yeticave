export class CategoryService {
  #data = null;

  constructor(data) {
    this.#data = data;
  }

  findAll() {
    return this.#data.categories;
  }
}
