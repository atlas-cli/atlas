import type {Config} from 'jest';

const config: Config = {
  verbose: true,
  coverageDirectory: 'packages',
  preset: 'ts-jest',
  testEnvironment: 'node',
};

export default config;