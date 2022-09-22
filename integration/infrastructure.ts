import { App } from 'aws-cdk-lib';
import { HelloWorldStack } from './hello-world/infrastructure';

const app = new App();
new HelloWorldStack(app, 'HelloWorldStack');
app.synth();