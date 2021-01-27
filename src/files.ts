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

export const loadTemplate = flow(configFolder.getFileName, readFile);

export const loadPartials = (paths: string[] = []): Record<string, string> => {
  return paths.reduce((partials, currentPath) => {
    const { name } = path.parse(currentPath);
    partials[name] = loadTemplate(currentPath);
    return partials;
  }, {} as Record<string, string>);
};

export const loadConfiguration = (filePath: string): Configuration => {
  configFolder.set(
    path.parse(filePath).dir
  );
  const cfg = parseFile(filePath) as Configuration;
  validateConfiguration(cfg);
  return cfg;
};

export const loadSpecification = (filePath: string): Specification => parseFile(filePath) as Specification;
