export class CommentService {
  #Comment = null;
  #User = null;

  constructor(sequelize) {
    this.#Comment = sequelize.models.Comment;
    this.#User = sequelize.models.User;
  }

  async create(userId, lotId, comment) {
    const commentData = {
      userId: userId,
      lotId: lotId,
      text: comment,
    };

    return this.#Comment.create(commentData);
  }

  async findAllByLotId(lotId) {
    return this.#Comment.findAll({
      where: { lotId },
      attributes: ['text', 'createdAt'],
      include: {
        model: this.#User,
        as: 'user',
        attributes: {
          exclude: ['passwordHash'],
        },
      },
    });
  }
}
