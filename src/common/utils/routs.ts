import { CATEGORY_PARAMETER_NAME, LOTS_PREFIX } from '../constants';

export const getLotPath = (id: string) => `${LOTS_PREFIX}/${id}`;

export const getLotCategoryPath = (name: string) => {
  const category = name.toLowerCase();
  return `${LOTS_PREFIX}${CATEGORY_PARAMETER_NAME}/${category}`;
};
