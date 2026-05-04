/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  
  // Ignorar archivos compilados en dist
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/"
  ],
  
  // Patrón para encontrar archivos de test
  testMatch: [
    "**/__tests__/**/*.ts",
    "**/?(*.)+(spec|test).ts"
  ],
  
  // Extensiones de archivo a procesar
  moduleFileExtensions: ["ts", "js", "json"],
  
  // Ignorar transformación en node_modules
  transformIgnorePatterns: [
    "node_modules/(?!(uuid|get-age|axios)/)"
  ]
};

export default config;
