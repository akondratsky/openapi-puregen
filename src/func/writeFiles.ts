import { promises as fs } from 'fs';
import { OutputData } from 'app/types';


export const writeFiles = (data: OutputData[]): void => {
  data.forEach(({ content, output }) => {
    fs.writeFile(output, content)
      .then(() => {
        console.log(`File written: ${output}`);
      })
      .catch((reason) => {
        console.error(`Error writing file: ${output}.\r\n`, reason);
      });
  });
};
