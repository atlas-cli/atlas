import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export class HelloWorldStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    const atlasKey = cdk.Fn.importValue('atlasKey');
    console.log('atlasKey', atlasKey);

    // 👇 define GET hello world function
    const helloWorldLambda = new lambda.Function(this, 'HelloHandler', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('integration_dist/hello-world'),
      handler: 'src/index.handler' 
    });

    // 👇 define api gateway rest api
    const api = new apigateway.RestApi(this, 'api', {
      description: 'example api gateway hello world',
      deployOptions: {
        stageName: 'integration-test',
      },
    });

    // 👇 create a resource
    const helloWorldResource = api.root.addResource('hello-world');

    // 👇 integrate method GET / with helloWorldLambda
    helloWorldResource.addMethod(
      'GET',
      new apigateway.LambdaIntegration(helloWorldLambda, {proxy: true}),
    );

    // 👇 create an Output for the API URL
    new cdk.CfnOutput(this, 'apiUrl', {value: api.url});
  }
}