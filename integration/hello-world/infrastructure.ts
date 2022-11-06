import { Atlas, LambdaStack, CustomStackFactory, } from '@atlas/infrastructure';
import { LAMBDA_STACK_CONFIG, } from '@atlas/infrastructure/constants';
import { join } from 'path';
import * as lambda from 'aws-cdk-lib/aws-lambda';

const atlas = new Atlas({
    name: 'hello-world',
    applications: [
        CustomStackFactory(
            (app, atlasConfig) => {
                let config = {
                    ...LAMBDA_STACK_CONFIG,
                    functionProps: 
                    {
                        functionName: atlasConfig.name + `-handler`,
                        bundling: {
                          externalModules: [
                            'aws-sdk', // Use the 'aws-sdk' available in the Lambda runtime
                            'cache-manager',
                            '@nestjs/microservices',
                            '@nestjs/websockets/socket-module',
                            '@nestjs/websockets/socket-module',
                            '@nestjs/microservices/microservices-module',
                          ],
                          tsconfig: 'integration/tsconfig.json',
                        },
                        depsLockFilePath: join(__dirname, '..', 'package-lock.json'),
                        entry: join(__dirname, 'src', 'index.js'),
                        runtime: lambda.Runtime.NODEJS_14_X,
                      }
                };
                return new LambdaStack(app, `lambda-stack`, {}, atlasConfig, config);
            }
        ),
    ]
});
atlas.bootstrap();