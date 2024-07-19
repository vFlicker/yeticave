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
    // TODO: Refactor this.
    // We should't use associations in the service layer.
    return this.#Lot.findOne({
      where: { id },
      include: [
        'category',
        'user',
        {
          association: 'bids',
          include: 'user',
        },
        {
          association: 'comments',
          include: 'user',
        },
      ],
    });
  }

  async create(lot) {
    return this.#Lot.create(lot);
  }
}
