#!/usr/bin/env node
const [, , functionName, ...args] = process.argv;
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import * as AWS from 'aws-sdk';

// Configure the AWS SDK to use your account credentials
AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Create an instance of the AWS.Lambda class
const lambda = new AWS.Lambda();

// Define the name of your lambda function and the input parameters
const params: AWS.Lambda.Types.InvocationRequest = {
  FunctionName: functionName,
  LogType: 'Tail',
  Payload: JSON.stringify({
    command: args.join(' '),
  }),
};

// Execute the lambda function
lambda.invoke(params, function (err, data) {
  if (err) {
    // Handle the error here
    console.error(err);
  } else {
    // Access the result of the lambda function here
    console.log('Exec: ', functionName);

    const logBuffer = new Buffer(data['LogResult'], 'base64');
    const text = logBuffer.toString('ascii');
    console.log('LogResult:\n', text);
    console.log('Payload: ', data['Payload']);
  }
});
