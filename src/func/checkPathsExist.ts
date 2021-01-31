import fs from 'fs';
import path from 'path';

export const checkPathsExist = (...files: string[]): void => {
  let error = false;
  files.forEach((file) => {
    if (!fs.existsSync(path.resolve(file))) {
      console.error(`Error: ${file} does not exists`);
      error = true;
    }
  });
  if (error) process.exit();
};
