import * as cdk from 'aws-cdk-lib';

export class AtlasCoreStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new cdk.CfnOutput(this, 'atlasKey', {value: '12345678'});
  }
}