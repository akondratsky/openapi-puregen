import { writeFiles } from '../writeFiles';
import { promises as fs } from 'fs';

jest.mock('fs', () => ({
  promises: {
    writeFile: jest.fn()
  }
}));


const fsWriteFileMock = fs.writeFile as jest.Mock<Promise<void>>;

jest.spyOn(global.console, 'log').mockImplementation(jest.fn());
jest.spyOn(global.console, 'error');

describe('writeFiles', () => {
  const outputDataStub = [{
    content: 'a',
    output: 'c.txt'
  }, {
    content: 'b',
    output: 'd.txt'
  }];

  afterEach(jest.clearAllMocks);

  it('normally writes content and outputs success result', () => {
    fsWriteFileMock.mockReturnValue(Promise.resolve());
    writeFiles(outputDataStub);
    expect(fsWriteFileMock).toHaveBeenCalledTimes(2);
    expect(fsWriteFileMock.mock.calls).toEqual([
      ['c.txt', 'a'],
      ['d.txt', 'b']
    ]);
  });

  it('catches an errors and outputs it', () => {
    fsWriteFileMock.mockReturnValue(Promise.reject());
    writeFiles(outputDataStub);
    expect(fsWriteFileMock).toHaveBeenCalledTimes(2);
    expect(fsWriteFileMock.mock.calls).toEqual([
      ['c.txt', 'a'],
      ['d.txt', 'b']
    ]);
  });
});
