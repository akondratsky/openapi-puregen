import YAML from 'yaml';
import fs from 'fs';
import { Specification, Configuration } from './types';
import { iterateRenderables } from './func/prepare';

export const parse = (filename: string): Specification => {
  const content = fs.readFileSync(filename, 'utf-8');
  return YAML.parse(content);
};

const spec = parse('./src/integration/spec.yaml') as Specification;
const cfg =  parse('./src/integration/cfg.yaml') as unknown as Configuration;

const result = iterateRenderables({ spec, cfg });

console.dir(result, {
  depth: 100
});
