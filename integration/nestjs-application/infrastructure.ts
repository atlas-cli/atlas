import { Atlas, LambdaStack, CustomStackFactory } from '@atlas-org/infrastructure';
import { LAMBDA_STACK_CONFIG } from '@atlas-org/infrastructure/constants';
import { join } from 'path';
import * as lambda from 'aws-cdk-lib/aws-lambda';

const atlas = new Atlas({
  name: 'nestjs-application',
  applications: [
    CustomStackFactory((app, atlasConfig) => {
      const config = {
        ...LAMBDA_STACK_CONFIG,
        functionProps: {
          functionName: atlasConfig.name + `-handler`,
          bundling: {
            minify: true,
            externalModules: [
              'aws-sdk', // Use the 'aws-sdk' available in the Lambda runtime
              'cache-manager',
              'class-transformer',
              '@nestjs/microservices',
              '@nestjs/websockets/socket-module',
              '@nestjs/websockets/socket-module',
              '@nestjs/microservices/microservices-module',
            ],
            nodeModules: ['@nestjs/microservices'],
          },
          depsLockFilePath: join(
            __dirname,
            '../../integration/nestjs-application',
            'package-lock.json',
          ),
          entry: join(__dirname, 'src/index.js'),
          handler: 'handler',
          runtime: lambda.Runtime.NODEJS_16_X,
        },
      };
      return new LambdaStack(app, `nestjs-application-stack`, {}, atlasConfig, config);
    }),
  ],
});
atlas.bootstrap();
