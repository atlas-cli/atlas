import { HttpException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ClientLambda } from './../../client/client-lambda';

describe('client aws lambda', () => {
  const clientLambda = new ClientLambda({
    aws: {} as any,
    functionName: 'mock-bus-name',
  });

  class MockClient {
    async send() {
      return {
          StatusCode: 200,
          Payload: clientLambda.serialize('{}'),
      };
    }
  }
  class MockClientError {
    async send() {
      return {
          StatusCode: 500,
          Payload: clientLambda.serialize('{"errorMessage": "mock error message"}'),
          errorMessage: 'mock error message',
          err: '',
      };
    }
  }
  class MockClientInternalError {
    async send() {
      throw new HttpException('Internal Error', 500);
    }
  }
  clientLambda.client = new MockClient() as any;

  test('connect', async () => {
    await clientLambda.connect();
  });

  test('test client emit method', () => {
    clientLambda.emit('event_async', {})
      .subscribe((output) => expect(output).toStrictEqual({}));
  });

  test('test client emit lambda response error', () => {
    clientLambda.client = new MockClientError() as any;
    clientLambda.emit('event_async', {})
        .subscribe((output) => {
            expect(output).toStrictEqual({});
        });
  });

  test('test client send method', () => {
    clientLambda.send('event_request_response', {})
        .subscribe((output) => {
            expect(output).toStrictEqual({});
        });
  });

  test('test client send lambda response error', () => {
    clientLambda.client = new MockClientError() as any;
    clientLambda.send('event_request_response', {})
        .subscribe((output) => {
            expect(output).toStrictEqual({});
        });
  });

  test('test client send internal error', () => {
    clientLambda.client = new MockClientInternalError() as any;
    clientLambda.send('event_request_response', {})
        .subscribe((output) => {
            expect(output).toThrow(RpcException);
        });
  });

  test('close', () => {
    clientLambda.close().then((output) => expect(output).toBe(undefined));
  });
});
