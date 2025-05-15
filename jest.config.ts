

import type {Config} from 'jest';

const config: Config = {
  bail: true,
  clearMocks: true,
  coverageProvider: "v8",
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: [
    "<rootDir>/src/**/*.test.ts", // O testMatch server para especificar os arquivos que serão testados
  ],
  moduleNameMapper: {
    "^/(.*)$": "<rootDir>/src/$1" // o modulenamemapper é usado para mapear os arquivos que serão testados
  }
};

export default config;
