export class UserService {
  #User = null;

  constructor(sequelize) {
    this.#User = sequelize.models.User;
  }

  async create(userData) {
    const createdUser = await this.#User.create(userData);
    return createdUser.get();
  }

  async findByEmail(email) {
    const user = await this.#User.findOne({
      where: { email },
    });

    return user && user.get();
  }
}
