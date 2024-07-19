export class CommentService {
  #Comment = null;

  constructor(sequelize) {
    this.#Comment = sequelize.models.Comment;
  }

  async create(userId, lotId, comment) {
    const commentData = {
      userId: userId,
      lotId: lotId,
      text: comment,
    };

    return this.#Comment.create(commentData);
  }

  async findByLotId(lotId) {
    return this.#Comment.findAll({
      where: { lotId },
      attributes: ['text', 'createdAt'],
      include: {
        association: 'user',
        attributes: ['username'],
      },
    });
  }
}
