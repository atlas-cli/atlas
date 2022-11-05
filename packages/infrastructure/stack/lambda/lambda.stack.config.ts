import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export class LambdaStackConfig {
    functionProps: lambda.FunctionProps;
    restApiProps: apigateway.RestApiProps;
}