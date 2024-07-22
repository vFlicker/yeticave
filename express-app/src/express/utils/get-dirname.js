import path from 'path';
import { fileURLToPath } from 'url';

export const getDirname = (fileURL) => {
  const __filename = fileURLToPath(fileURL);
  return path.dirname(__filename);
};
