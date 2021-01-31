import { checkPathsExist } from './checkPathsExist';
import fs from 'fs';

export const checkFoldersExist = (...folders: string[]): void => {
  checkPathsExist(...folders);

  let error = false;
  folders.forEach((folder) => {
    const { isDirectory } = fs.statSync(folder);
    if (!isDirectory) {
      console.error(`Error: ${folder} is not a directory`);
      error = true;
    }
  });
  if (error) process.exit();
};
