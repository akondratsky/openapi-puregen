import path from 'path';

let _configFolder: string | undefined;

const configurationError = new Error('Configuration file was not loaded properly');


export const get = (): string => {
  if (!_configFolder) {
    throw configurationError;
  }
  return _configFolder;
};

export const set = (value: string): void => {
  _configFolder = path.resolve(value);
};

export const getFileName = (filePath: string): string => {
  if (!_configFolder) {
    throw configurationError;
  }
  return path.resolve(_configFolder, filePath);
};
