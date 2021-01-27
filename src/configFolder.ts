let _configFolder: string | undefined;

export const configFolder = {
  get(): string {
    if (!_configFolder) {
      throw new Error('Configuration file was not loaded properly');
    }
    return _configFolder;
  },

  set(value: string): void {
    _configFolder = value;
  }
};
