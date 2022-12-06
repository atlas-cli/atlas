import * as lambda from 'aws-cdk-lib/aws-lambda';
import { join } from 'path';
import { LambdaStackConfig } from "./stack/lambda/lambda.stack.config";
import { StackFactory, ApplicationStackFactory } from "./factory";
import { AtlasCoreStack, LambdaStack } from "./stack";
import { AtlasLogger } from "./logger/atlas.logger";

// Providers
export const CONFIG = 'CONFIG';
export const STACKS = 'STACKS';

// Outputs
export const CORE_OUTPUT = 'CORE_OUTPUT';

// Stacks
export const DEFAULT_INFRASTRUCTURE_STACKS = [
    StackFactory(AtlasCoreStack),
];

export const DEFAULT_APPLICATION_STACKS = [
    ApplicationStackFactory(LambdaStack),
];

export const DEFAULT_NESTJS_INFRAESTRUCTURE_OPTIONS = {
    logger: new AtlasLogger('Infrastructure')
}

export const DEFAULT_NESTJS_APPLICATION_OPTIONS = {
    logger: new AtlasLogger('Application')
}

// Stacks Configs
export const LAMBDA_STACK_CONFIG: LambdaStackConfig = {
    functionProps: {
        functionName: `lambda-stack-handler`,
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
    },
    restApiProps: {
        description: 'lambda application',
        deployOptions: {
            stageName: 'dev',
        },
    },
};