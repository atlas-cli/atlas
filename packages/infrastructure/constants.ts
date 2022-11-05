import * as lambda from 'aws-cdk-lib/aws-lambda';
import { LambdaStackConfig } from "./stack/lambda/lambda.stack.config";
import { StackFactory, ApplicationStackFactory } from "./factory";
import { AtlasCoreStack, LambdaStack } from "./stack";

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

// Stacks Configs
export const LAMBDA_STACK_CONFIG: LambdaStackConfig = {
    functionProps: {
        runtime: lambda.Runtime.NODEJS_14_X,
        code: lambda.Code.fromAsset('dist'),
        handler: 'src/index.handler'
    },
    restApiProps: {
        description: 'lambda application',
        deployOptions: {
            stageName: 'dev',
        },
    },
};