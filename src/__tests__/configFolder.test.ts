import * as configFolder from '../configFolder';
import path from 'path';

describe('configFolder', () => {
  it('sets and gets value', () => {
    configFolder.set('./mypath');
    expect(configFolder.get()).toBe('./mypath');
  });

  it('throws an error if path is empty', () => {
    configFolder.set('');
    expect(() => {
      configFolder.get();
    }).toThrow();
  });

  it('getFileName resolves filename', () => {
    const p = path.resolve();
    configFolder.set(p);
    expect(configFolder.getFileName('name')).toBe(path.resolve(p, 'name'));
  });

  it('getFileName throws error if path is empty', () => {
    configFolder.set('');
    expect(() => {
      configFolder.getFileName('filename');
    }).toThrow();
  });
});
