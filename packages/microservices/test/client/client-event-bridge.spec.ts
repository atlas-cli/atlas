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
    clientEventBridge.emit('test_event', {})
      .subscribe((output) => expect(output).toStrictEqual({}));
  });

  test('test client emit event with detail type', () => {
    clientEventBridgeWithDetailType.emit('test_event', {})
      .subscribe((output) => expect(output).toStrictEqual({}));
  });

  test('close', () => {
    clientEventBridge.close();
  });

  test('dispatchEvent', () => {
    clientEventBridge.dispatchEvent({} as any);
  });

  test('publish', () => {
    clientEventBridge.publish()();
  });
});
