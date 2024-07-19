1. Додати CommentService (створення коментаря, отримання всіх коментарів для лоту, отримання всіх коментарів користувача)
1. Додати завантаження коментарів
1. Валідація коментарю (перевірка на зайві ключі) comment-validator.js

1. Валідація лоту (перевірка на існування лоту) offer-exists.js

1. Пагінація

// TODO: add pagination
// async findPage({ limit, offset }) {
//   const { count, rows } = await this.#Lot.findAndCountAll({
//     limit,
//     offset,
//     include: ['category'],
//     order: [[`createdAt`, `DESC`]],
//   });

//   return { count, offers: rows };
// }
