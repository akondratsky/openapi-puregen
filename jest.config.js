module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globalSetup: '<rootDir>/jest.setup.js',
  testPathIgnorePatterns: ['lib/'],
  moduleNameMapper: {
    '^app/(.*)': '<rootDir>/src/$1'
  },
  collectCoverageFrom: [
    'src/**/*.ts'
  ]
};
