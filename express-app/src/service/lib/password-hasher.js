import { compare, hash, hashSync } from 'bcrypt';

const SALT_ROUNDS = 10;

export const passwordHasher = {
  hash: async (password) => {
    return hash(password, SALT_ROUNDS);
  },
  // TODO: use it the tests
  hashSync: (password) => {
    return hashSync(password, SALT_ROUNDS);
  },
  verify: (password, hash) => {
    return compare(password, hash);
  },
};
