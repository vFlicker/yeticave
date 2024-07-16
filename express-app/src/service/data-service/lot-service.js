export class LotService {
  #Lot = null;

  constructor(sequelize) {
    this.#Lot = sequelize.models.Lot;
  }

  async findAll() {
    return this.#Lot.findAll();
  }

  async findAllByCategory(id) {
    return this.#Lot.findAll({ where: { categoryId: id } });
  }

  async findOne(id) {
    return this.#Lot.findByPk(id);
  }

  async create(lot) {
    return this.#Lot.create(lot);
  }
}
