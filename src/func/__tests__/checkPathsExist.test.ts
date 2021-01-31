import { checkPathsExist } from '../checkPathsExist';

import { existsSync } from 'fs';
import { resolve } from 'path';

jest.mock('fs', () => ({
  existsSync: jest.fn()
}));
jest.mock('path', () => ({
  resolve: (str: string): string => str
}));

const existsSyncMock = existsSync as jest.Mock<boolean>;

const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {
  throw new Error('exited');
});

const errorSpy = jest.spyOn(console, 'error').mockImplementation(jest.fn());

describe('checkPathsExist', () => {
  afterAll(() => {
    exitSpy.mockRestore();
    errorSpy.mockRestore();
  });

  it('checks whenever any file does not exist and shows error', () => {
    const testCase = [{
      filename: './test/filename.yaml',
      exists: false
    }, {
      filename: './test/aaa.yaml',
      exists: true
    }];

    let count = 0;
    existsSyncMock.mockImplementation(() => {
      return testCase[count++].exists;
    });

    expect(() => {
      checkPathsExist(testCase[0].filename, testCase[1].filename);
    }).toThrow();

    expect(errorSpy).toHaveBeenCalledTimes(1);
  });
});
