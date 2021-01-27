import path from 'path';

let _configFolder: string | undefined;

const configurationError = new Error('Configuration file was not loaded properly');

export const configFolder = {
  get(): string {
    if (!_configFolder) {
      throw configurationError;
    }
    return _configFolder;
  },

  set(value: string): void {
    _configFolder = value;
  },
  getFileName(filePath: string): string {
    if (!_configFolder) {
      throw configurationError;
    }
    return path.resolve(_configFolder, filePath);
  }
};
