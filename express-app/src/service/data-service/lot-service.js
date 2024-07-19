export class LotService {
  #Lot = null;

  constructor(sequelize) {
    this.#Lot = sequelize.models.Lot;
  }

  async findAll() {
    return this.#Lot.findAll({
      include: 'category',
      order: [['createdAt', 'DESC']],
    });
  }

  async findAllByCategory(id) {
    return this.#Lot.findAll({
      where: { categoryId: id },
      include: 'category',
      order: [['createdAt', 'DESC']],
    });
  }

  async findOne(id) {
    // TODO: exclude hashPassword from the user
    // TODO: show last 10 bids
    return this.#Lot.findOne({
      where: { id },
      include: [
        'category',
        'user',
        {
          association: 'bids',
          include: 'user',
        },
      ],
    });
  }

  async create(lot) {
    return this.#Lot.create(lot);
  }
}
