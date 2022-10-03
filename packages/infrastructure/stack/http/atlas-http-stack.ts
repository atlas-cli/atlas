import * as cdk from 'aws-cdk-lib';

export class AtlasHttpStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps, coreOutput?: any,) {
    super(scope, id, props);
    console.log(coreOutput);
  }
}