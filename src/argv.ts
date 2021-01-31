import { string } from 'joi';
import yargs from 'yargs';

export const argv = yargs(process.argv).options({
  config: { alias: 'c', type: 'string', description: 'path to configuration file' },
  spec: { alias: 's', type: 'string', description: 'path to OpenAPI specification file' }
}).argv;
