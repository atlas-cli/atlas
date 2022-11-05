import { Atlas, LambdaStack, CustomStackFactory, } from '@atlas/infrastructure';
import { LAMBDA_STACK_CONFIG } from '@atlas/infrastructure/constants';
import * as lambda from 'aws-cdk-lib/aws-lambda';

const atlas = new Atlas({
    name: 'hello-world',
    applications: [
        CustomStackFactory(
            (app, atlasConfig) => {
                let config = {
                    ...LAMBDA_STACK_CONFIG,
                    functionProps: {
                        runtime: lambda.Runtime.NODEJS_14_X,
                        code: lambda.Code.fromAsset('dist/nestjs-application'),
                        handler: 'src/index.handler'
                    },
                };
                return new LambdaStack(app, `lambda-stack`, {}, atlasConfig, config);
            }
        ),
    ]
});
atlas.bootstrap();