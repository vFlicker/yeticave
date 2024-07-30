export const users = [
  { id: 1, name: 'John Doe', email: 'test@mail.com' },
  { id: 2, name: 'Jane Doe', email: 'test@mail.com' },
];

export const categories = [
  { id: 1, name: 'Boards' },
  { id: 2, name: 'Attachment' },
  { id: 3, name: 'Boots' },
  { id: 4, name: 'Clothing' },
  { id: 5, name: 'Tools' },
  { id: 6, name: 'Other' },
];

export const bids = [
  {
    id: 1,
    amount: 3.0,
    lotId: 1,
    userId: 1,
    createdAt: '2024-06-10T13:25:00',
  },
  {
    id: 2,
    amount: 2.0,
    lotId: 1,
    userId: 2,
    createdAt: '2024-06-04T16:35:00',
  },
];

export const comments = [
  {
    id: 1,
    text: 'So beautiful',
    lotId: 1,
    userId: 1,
    createdAt: '2024-06-10T13:25:00',
  },
  {
    id: 2,
    text: 'I agree',
    lotId: 1,
    userId: 2,
    createdAt: '2024-06-04T16:35:00',
  },
];

export const lots = [
  {
    id: 1,
    categoryId: 1,
    bidsIds: [1, 2],
    commentsIds: [1, 2],
    title: 'Flowers',
    description: 'So beautiful',
    image:
      'https://contentgrid.homedepot-static.com/hdus/en_US/DTCCOMNEW/Articles/discover-the-secret-language-of-flowers-2022-hero.jpeg',
    startingPrice: 1.0,
    currentPrice: 3.0,
    createdAt: '2024-06-10T13:25:00',
    finishedAt: '2024-06-17T13:25:00',
  },
  {
    id: 2,
    categoryId: 2,
    bidsIds: [],
    commentsIds: [],
    title: 'Screwdriver',
    description:
      'A screwdriver is a tool, manual or powered, used for screwing (installing) and unscrewing (removing) screws.',
    image:
      'https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcQi2Hc-YhXS98aLOP2KcWiBhkbRYiQE55oc16rr7AMMmyGpqFC9s2sqEsR2QlUL9nZ1',
    startingPrice: 2.0,
    currentPrice: 2.0,
    createdAt: '2024-06-04T16:35:00',
    finishedAt: '2024-06-10T13:25:00',
  },
];
