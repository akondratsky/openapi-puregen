import YAML from 'yaml';
import fs from 'fs';
import path from 'path';
import { Configuration, Specification } from 'app/types';
import { validateConfiguration } from 'app/validation';
import { flow } from 'lodash';
import { configFolder } from './configFolder';


/**
 * All path can be related and absolute. If absolute paths are absolut unambuguous, relative can be relative to config
 * or to current working directory.
 * We are loading:
 * Relative to working directory  |  configuration file
 * --------------------------------------------------------------
 * configuration file             |   templates
 * specification file             |   partials
 */

const readFile = (filename: string): string => fs.readFileSync(filename, 'utf-8');
const parseFile = flow(readFile, YAML.parse);


export const loadTemplate = (filePath: string): string => {
  const absolutePath = path.isAbsolute(filePath) ? filePath : path.resolve(configFolder.get(), filePath);
  return readFile(absolutePath);
};


export const loadPartials = (paths: string[] = []): Record<string, string> => {
  return paths.reduce((partials, currentPath) => {
    const { name } = path.parse(currentPath);
    partials[name] = loadTemplate(currentPath);
    return partials;
  }, {} as Record<string, string>);
};


export const useConfig = (filePath: string): Configuration => {
  configFolder.set(
    path.parse(filePath).dir
  );
  const cfg = parseFile(filePath) as Configuration;
  validateConfiguration(cfg);
  return cfg;
};

export const useSpec = (filePath: string): Specification => parseFile(filePath) as Specification;

