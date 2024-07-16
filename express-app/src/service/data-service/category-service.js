export class CategoryService {
  #Category = null;

  constructor(sequelize) {
    this.#Category = sequelize.models.Category;
  }

  async findAll() {
    return this.#Category.findAll();
  }

  async findById(id) {
    return this.#Category.findByPk(id);
  }
}
