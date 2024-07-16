import { Sequelize } from 'sequelize';

export class CategoryService {
  #Category = null;
  #Lot = null;

  constructor(sequelize) {
    this.#Category = sequelize.models.Category;
    this.#Lot = sequelize.models.Lot;
  }

  async findAll() {
    return this.#Category.findAll();
  }

  async findAllWithCount() {
    return this.#Category.findAll({
      include: {
        model: this.#Lot,
        as: 'lots',
        attributes: [],
      },
      attributes: {
        include: [
          [Sequelize.fn('COUNT', Sequelize.col('lots.categoryId')), 'count'],
        ],
      },
      group: ['Category.id'],
    });
  }

  async findById(id) {
    return this.#Category.findByPk(id);
  }
}
