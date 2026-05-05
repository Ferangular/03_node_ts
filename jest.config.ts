import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-node',

  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',

  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/'
  ],

  testMatch: [
    '**/__tests__/**/*.ts',
    '**/?(*.)+(spec|test).ts'
  ],

  moduleFileExtensions: ['ts', 'js', 'json']
};

export default config;