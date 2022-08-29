import { LambdaClientConfig } from '@aws-sdk/client-lambda';

export interface ClientLambdaConfig {
    aws: LambdaClientConfig;
    functionName: string;
}