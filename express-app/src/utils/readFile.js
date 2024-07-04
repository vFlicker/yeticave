import fs from 'fs/promises';

export const readFile = async (filePath, initialURL) => {
  const file = await fs.readFile(new URL(filePath, initialURL));
  return JSON.parse(file.toString());
};
