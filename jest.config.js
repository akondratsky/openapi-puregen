module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globalSetup: '<rootDir>/jest.setup.js',
  testPathIgnorePatterns: ['dst/'],
  moduleNameMapper: {
    '^app/(.*)': '<rootDir>/src/$1'
  },
  collectCoverageFrom: [
    'src/**/*.ts'
  ]
};
