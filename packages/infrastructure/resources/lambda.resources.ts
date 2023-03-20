import { Construct } from 'constructs';
import { AuroraDatabaseProxy } from '../constructs/aurora-database-proxy/aurora-database-proxy.construct';
import { LambdaRole } from '../constructs/lambda-role/lambda-role.construct';
import { LambdaNestJsFunction } from '../constructs/lambda-nestjs-function/lambda-nestjs-function.constructs';
import { ApiGateway } from '../constructs/api-gateway/api-gateway.construct';
import { ApplicationProps } from '../props/application.props';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { GenericSecurityGroup } from '../constructs/generic-security-group/generic-security-group.construct';
import { createName as defaultCreateName } from '../utils/create-name';
import { Port } from 'aws-cdk-lib/aws-ec2';

export class LambdaResource extends Construct {
  constructor(
    scope: Construct,
    id: string,
    applicationProps: ApplicationProps,
  ) {
    super(scope, id);
    // setup prefix
    const createName = (name, config) =>
      defaultCreateName(`lambda-${name}`, config);

    // import vpc, and rds proxy
    const { vpc, securityGroup: databaseSecurityGroup } = GenericSecurityGroup.fromName(
      this,
      'database-sg',
      applicationProps,
    );

    // get proxy sg
    const { securityGroup: databaseProxySecurityGroup } = GenericSecurityGroup.fromName(
      this,
      'database-proxy-sg',
      applicationProps,
    );

    const { proxy } = AuroraDatabaseProxy.fromNameAndSecurityGroup(
      this,
      'aurora-database-proxy',
      databaseProxySecurityGroup,
      applicationProps,
    );

    //Lambda SG
    const lambdaSecurityGroup = new GenericSecurityGroup(
      this,
      createName('lambda-sg', applicationProps),
      {
        vpc,
        ...applicationProps,
      },
    );

    // Lambda access to proxy
    databaseProxySecurityGroup.addIngressRule(lambdaSecurityGroup.securityGroup, Port.tcp(5432), `Allows access from lambdas to the ${proxy.dbProxyName}`);

    // create iam role
    const LAMBDA_ROLE_NAME = createName('role', applicationProps);
    const { role } = new LambdaRole(this, LAMBDA_ROLE_NAME, applicationProps);

    // grant access to lambda connect in aurora database
    proxy.grantConnect(role, 'postgres');

    // create nodejs function
    const LAMBDA_NESTJS_FUNCTION_NAME = createName(
      'function',
      applicationProps,
    );
    const { nodejsFunction } = new LambdaNestJsFunction(
      this,
      LAMBDA_NESTJS_FUNCTION_NAME,
      {
        ...applicationProps,
        functionName: 'users',
        moduleName: 'users',
        role,
        vpc,
        securityGroups: [lambdaSecurityGroup.securityGroup],
      },
    );

    // Create an API Gateway resource for each of the CRUD operations
    const API_GATEWAY_FUNCTION_NAME = createName(
      'api-gateway',
      applicationProps,
    );
    const { api } = new ApiGateway(this, API_GATEWAY_FUNCTION_NAME, {
      ...applicationProps,
      restApiName: 'api',
    });

    // Integrate the Lambda functions with the API Gateway resource
    const httpIntegration = new LambdaIntegration(nodejsFunction, {
      proxy: true,
    });

    const items = api.root.addResource('{proxy+}');
    items.addMethod('ANY', httpIntegration);
  }
}
