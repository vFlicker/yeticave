export class SearchService {
  #data = null;

  constructor(data) {
    this.#data = data;
  }

  search(searchQuery) {
    const { categories, bids, comments, users } = this.#data;

    const userMap = new Map(users.map((user) => [user.id, user]));
    const categoryMap = new Map(
      categories.map((category) => [category.id, category]),
    );

    const foundLots = this.#data.lots.filter((lot) => {
      return lot.title.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return foundLots.map((lot) => {
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
}
