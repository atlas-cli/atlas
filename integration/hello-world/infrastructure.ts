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
                        minify: true,
                      },
                      depsLockFilePath: join(__dirname, '../../integration/hello-world', 'package-lock.json'),
                      entry: join(__dirname, 'src/index.js'),
                      handler: 'handler',
                      runtime: lambda.Runtime.NODEJS_16_X,
                    }
              };
              return new LambdaStack(app, `lambda-stack`, {}, atlasConfig, config);
          }
      ),
    ]
});
atlas.bootstrap();