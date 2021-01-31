import * as configFolder from '../configFolder';
import path from 'path';

const resolveSpy = jest.spyOn(path, 'resolve');

describe('configFolder', () => {
  afterEach(() => {
    resolveSpy.mockClear();
  });

  afterAll(() => {
    resolveSpy.mockRestore();
  });

  it('sets and gets value', () => {
    resolveSpy.mockImplementation(p => p);
    configFolder.set('./mypath');
    expect(configFolder.get()).toBe('./mypath');
  });

  it('throws an error if path is empty', () => {
    resolveSpy.mockImplementation(p => p);
    configFolder.set('');
    expect(() => {
      configFolder.get();
    }).toThrow();
  });

  it('getFileName resolves filename', () => {
    resolveSpy.mockImplementation(p => p);
    configFolder.set('/usr/bin/lol');
    expect(configFolder.getFileName('name')).toBe('/usr/bin/lol');
  });

  it('getFileName throws error if path is empty', () => {
    resolveSpy.mockImplementation(() => '');
    configFolder.set('');
    expect(() => {
      configFolder.getFileName('filename');
    }).toThrow();
  });
});
