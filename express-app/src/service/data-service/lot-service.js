export class LotService {
  #Lot = null;
  #User = null;

  constructor(sequelize) {
    this.#Lot = sequelize.models.Lot;
    this.#User = sequelize.models.User;
  }

  async findAll() {
    return this.#Lot.findAll({
      include: 'category',
      order: [['createdAt', 'DESC']],
    });
  }

  async findPage({ limit = 3, offset = 0 }) {
    return this.#Lot.findAndCountAll({
      limit,
      offset,
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
    // TODO: show last 10 bids
    return this.#Lot.findOne({
      where: { id },
      attributes: {
        exclude: ['categoryId'], // Вказуємо, що categoryId потрібно виключити
      },
      include: [
        'category',
        {
          model: this.#User,
          as: 'user',
          attributes: {
            exclude: ['passwordHash'],
          },
        },
        {
          association: 'bids',
          include: {
            model: this.#User,
            as: 'user',
            attributes: {
              exclude: ['passwordHash'],
            },
          },
        },
      ],
    });
  }

  async create(lot) {
    return this.#Lot.create(lot);
  }
}
