module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: { "@/(.*)": "<rootDir>/src/$1" },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/config/**/*.ts',
    '!node_modules/',
    '!tests/',
    '!static/',
    '!types/'
  ],
  coverageReporters: [
    'json-summary',
    'lcov',
    'text'
  ]
};