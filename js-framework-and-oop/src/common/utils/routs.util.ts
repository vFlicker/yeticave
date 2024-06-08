export const getLotPath = (id: string) => `/lots/${id}`;

export const getLotCategoryPath = (name: string) => {
  const category = name.toLowerCase();
  return `/lots/category/${category}`;
};
