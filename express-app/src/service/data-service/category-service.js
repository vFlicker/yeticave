export class CategoryService {
  #data = null;

  constructor(data) {
    this.#data = data;
  }

  findAll() {
    return this.#data.categories;
  }

  findById(id) {
    return this.#data.categories.find((category) => category.id === id);
  }
}
