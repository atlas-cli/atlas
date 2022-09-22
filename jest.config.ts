import type {Config} from 'jest';

const config: Config = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['integration_dist', 'cdk.out']
};

export default config;