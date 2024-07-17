import { Op } from 'sequelize';

export class SearchService {
  #Lot = null;

  constructor(sequelize) {
    this.#Lot = sequelize.models.Lot;
  }

  async search(searchText) {
    const data = await this.#Lot.findAll({
      where: {
        title: {
          [Op.substring]: searchText,
        },
      },
      order: [['createdAt', 'DESC']],
      include: 'category',
    });

    return data;
  }
}
