import * as apigateway from 'aws-cdk-lib/aws-apigateway';

import { NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';

export class LambdaStackConfig {
    functionProps: NodejsFunctionProps;
    restApiProps: apigateway.RestApiProps;
}