export class LotService {
  #data = null;

  constructor(data) {
    this.#data = data;
  }

  findAll() {
    const { lots, categories, bids, comments, users } = this.#data;

    const userMap = new Map(users.map((user) => [user.id, user]));
    const categoryMap = new Map(
      categories.map((category) => [category.id, category]),
    );

    return lots.map((lot) => {
      const { categoryId, bidsIds, commentsIds, ids, ...cleanLot } = lot;
      const currentCategory = categoryMap.get(categoryId);

      const lotBids = bids
        .filter(({ lotId }) => lotId === lot.id)
        .map((bid) => ({
          ...bid,
          user: userMap.get(bid.userId),
        }));

      const lotComments = comments
        .filter(({ lotId }) => lotId === lot.id)
        .map((comment) => ({
          ...comment,
          user: userMap.get(comment.userId),
        }));

      return {
        ...cleanLot,
        category: currentCategory,
        bids: lotBids,
        comments: lotComments,
      };
    });
  }

  findAllByCategory(id) {
    const { lots, categories, bids, comments, users } = this.#data;

    const userMap = new Map(users.map((user) => [user.id, user]));
    const categoryMap = new Map(
      categories.map((category) => [category.id, category]),
    );

    const lotsByCategory = lots.filter(({ categoryId }) => categoryId === id);

    return lotsByCategory.map((lot) => {
      const { categoryId, bidsIds, commentsIds, ids, ...cleanLot } = lot;
      const currentCategory = categoryMap.get(categoryId);

      const lotBids = bids
        .filter(({ lotId }) => lotId === lot.id)
        .map((bid) => ({
          ...bid,
          user: userMap.get(bid.userId),
        }));

      const lotComments = comments
        .filter(({ lotId }) => lotId === lot.id)
        .map((comment) => ({
          ...comment,
          user: userMap.get(comment.userId),
        }));

      return {
        ...cleanLot,
        category: currentCategory,
        bids: lotBids,
        comments: lotComments,
      };
    });
  }

  findOne(id) {
    const lot = this.#data.lots.find((lot) => lot.id === id);
    if (!lot) {
      return null;
    }

    const { categories, bids, comments, users } = this.#data;
    const { categoryId, bidsIds, commentsIds, ids, ...cleanLot } = lot;

    return {
      ...cleanLot,
      category: categories.find(({ id }) => id === categoryId),
      bids: bids
        .filter(({ lotId }) => lotId === lot.id)
        .map((bid) => ({
          ...bid,
          user: users.find(({ id }) => id === bid.userId),
        })),
      comments: comments
        .filter(({ lotId }) => lotId === lot.id)
        .map((comment) => ({
          ...comment,
          user: users.find(({ id }) => id === comment.userId),
        })),
    };
  }

  create(lot) {
    const { id: previousLotId } = this.#data.lots.at(-1);
    const newLot = { ...lot, id: previousLotId + 1 };
    this.#data.lots.push(newLot);
    return newLot;
  }
}
