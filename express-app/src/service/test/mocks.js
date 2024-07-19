export const mockCategories = [{ name: 'Boards' }, { name: 'Attachment' }];

export const mockLots = [
  {
    title: 'iPhone 13',
    description: 'Latest model of iPhone',
    imageUrl: 'http://example.com/iphone13.jpg',
    startingPrice: 1000,
    currentPrice: 1000,
    isActive: true,
    finishedAt: '2024-12-31T23:59:59Z',
    categoryId: 1,
    userId: 1,
  },
  {
    title: 'Harry Potter Book Set',
    description: 'Complete set of Harry Potter books',
    imageUrl: 'http://example.com/harrypotter.jpg',
    startingPrice: 50,
    currentPrice: 50,
    isActive: true,
    finishedAt: '2024-12-31T23:59:59Z',
    categoryId: 1,
    userId: 2,
  },
];

export const mockBids = [
  {
    amount: 1050,
    lotId: 1,
    userId: 2,
  },
  {
    amount: 55,
    lotId: 2,
    userId: 1,
  },
];

export const mockComments = [
  {
    text: 'Great product!',
    lotId: 1,
    userId: 2,
  },
  {
    text: 'This is a great book set!',
    lotId: 1,
    userId: 1,
  },
  {
    text: 'Looking forward to reading this!',
    lotId: 2,
    userId: 1,
  },
];

export const mockUsers = [
  {
    email: 'user1@example.com',
    username: 'user1',
    passwordHash: 'hashed_password1',
  },
  {
    email: 'user2@example.com',
    username: 'user2',
    passwordHash: 'hashed_password2',
  },
];
