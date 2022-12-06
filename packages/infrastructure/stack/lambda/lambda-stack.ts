import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { AtlasConfig } from '../../config';
import { LAMBDA_STACK_CONFIG } from '../../constants';
import { LambdaStackConfig } from './lambda.stack.config';

export class LambdaStack extends cdk.Stack {
  constructor(
    scope: cdk.App,
    id: string,
    props: cdk.StackProps,
    _atlasConfig: AtlasConfig,
    lambdaStackConfig: LambdaStackConfig = LAMBDA_STACK_CONFIG,
  ) {
    super(scope, id, props);
    // 👇 define lambda handler function
    const lambdaHandler = new NodejsFunction(
      this,
      id + `-handler`,
      lambdaStackConfig.functionProps,
    );
    const api = new apigateway.RestApi(this, 'api', lambdaStackConfig.restApiProps);

    // 👇 create a resource
    const proxyResource = api.root.addResource('{proxy+}');

    // 👇 integrate method GET / with lambdaHandler
    proxyResource.addMethod('ANY', new apigateway.LambdaIntegration(lambdaHandler, { proxy: true }),);

    // 👇 create an Output for the API URL
    new cdk.CfnOutput(this, 'apiUrl', { value: api.url });
  }
}
