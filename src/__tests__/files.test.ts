import { loadConfiguration, loadPartials, loadSpecification, loadTemplate } from '../files';
import { getFileName } from '../configFolder';
import { validateConfiguration } from 'app/validation';
import { readFileSync } from 'fs';

jest.mock('../configFolder', () => ({
  get: jest.fn(),
  set: jest.fn(),
  getFileName: jest.fn()
}));
jest.mock('app/validation', () => ({
  validateConfiguration: jest.fn()
}));
jest.mock('fs', () => ({
  readFileSync: jest.fn()
}));

const readFileSyncMock = readFileSync as unknown as jest.Mock<string>;
const getFileNameMock = getFileName as jest.Mock<string>;

describe('files methods', () => {
  afterEach(jest.clearAllMocks);

  it('loadTemplate', () => {
    getFileNameMock.mockReturnValue('test-filename');
    readFileSyncMock.mockReturnValue('{{the-template!}}');

    const actual = loadTemplate('./src/file');

    expect(getFileName).toHaveBeenCalledWith('./src/file');
    expect(readFileSync).toHaveBeenCalledWith('test-filename', 'utf-8');
    expect(actual).toBe('{{the-template!}}');
  });

  it('loadPartials loads partials', () => {
    readFileSyncMock.mockReturnValue('partial-content');
    const actual = loadPartials(['./fldr/a.mustache', './fldr/b.mustache']);
    expect(actual).toEqual({
      a: 'partial-content',
      b: 'partial-content'
    });
  });

  it('loadPartials returns empty object if no partials', () => {
    const actual = loadPartials(undefined);
    expect(actual).toEqual({});
  });

  it('loadSpecification loads and parses specification', () => {
    readFileSyncMock.mockReturnValue('stub: content');
    const actual = loadSpecification('./stub1.yaml');
    expect(actual).toEqual({ stub: 'content' });
  });

  describe('loadConfiguration', () => {
    beforeEach(() => {
      readFileSyncMock.mockReturnValue('stub: content');
    });

    it('loads configuration', () => {
      const actual = loadConfiguration('./file/stub.yaml');
      expect(actual).toEqual({ stub: 'content' });
    });

    it('launches validation', () => {
      loadConfiguration('./file/stub.yaml');
      expect(validateConfiguration).toHaveBeenCalledWith({ stub: 'content' });
    });
  });
});
