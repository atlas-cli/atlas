import { timeout } from 'rxjs';
import { ClientEventBridge } from './../../client/client-event-bridge';

describe('client aws event-bridge', () => {

  const clientEventBridge = new ClientEventBridge({
    aws: {} as any,
    eventBusName: 'mock-bus-name',
  });
  const clientEventBridgeWithDetailType = new ClientEventBridge({
    aws: {} as any,
    eventBusName: 'mock-bus-name',
    detailType: 'body-payload',
  });

  class MockClient {
    async send() {
      return {};
    }
  }

  clientEventBridge.client = new MockClient() as any;
  clientEventBridgeWithDetailType.client = new MockClient() as any;

  test('connect', async () => {
    await clientEventBridge.connect();
  });

  test('test client emit event', () => {
    clientEventBridge.emit('event_async', {})
      .subscribe((output) => expect(output).toStrictEqual({}));
  });

  test('test client emit event with detail type', () => {
    clientEventBridgeWithDetailType.emit('event_async', {})
      .subscribe((output) => expect(output).toStrictEqual({}));
  });

  test('test client send method', () => {
    clientEventBridgeWithDetailType.send('event_request_response', {})
        .subscribe((output) => {
            expect(output).toStrictEqual(undefined)
        });
  });

  test('test client send method timeout', () => {
    clientEventBridge.send('event_request_response', {})
        .pipe(timeout(2000))
        .subscribe(
          (response) => console.log(response),
          (error) => {
            console.log(error);
            expect(error.message).toBe('Timeout has occurred');
          },
        );
  });

  test('close', () => {
    clientEventBridge.close();
  });

});
