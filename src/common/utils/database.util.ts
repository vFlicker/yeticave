export const createPlaceholders = (length: number) => {
  return Array.from({ length }, (_, index) => `$${index + 1}`).join(', ');
};
