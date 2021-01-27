import fs from 'fs/promises';
import { OutputData } from 'app/types';


export const writeFiles = (data: OutputData[]): void => {
  data.forEach(({ content, output }) => {
    fs.writeFile(output, content)
      .then(() => {
        console.log(`File written: ${content}`);
      })
      .catch((reason) => {
        console.error(`Error writing file: ${output}.\r\n`, reason);
      });
  });
};
