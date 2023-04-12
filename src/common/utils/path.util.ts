import path from 'path';

export const getView = (dirname: string, fileName: string) => {
  return path.resolve(dirname, 'views', fileName);
};
