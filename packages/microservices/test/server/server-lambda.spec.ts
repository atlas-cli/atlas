import { TRANSPORT_METADATA_REQUEST_RESPONSE } from '../../constants';
import { ServerLambda } from './../../server/server-lambda';

describe('Server lambda', () => {
  const serverLambda = new ServerLambda();
  test('listen method', async () => {
    serverLambda.listen(() => expect(undefined).toBe(undefined));
  });
  test('get transport', async () => {
    expect(serverLambda.getTransport()).toBe(TRANSPORT_METADATA_REQUEST_RESPONSE);
  });
  test('handler no exists handler', async () => {
    serverLambda.handler({
      topic: 'event_topic',
      value: {},
    }).then((value) => expect(value).toBe(undefined));
  });
  test('handler lambda exists', async () => {
    serverLambda.getHandlerByPattern = (_) => {
      return async () => {
        return {};
      };
    }
    serverLambda.handler({
      topic: 'event_topic',
      value: {},
    }).then((value) => expect(value).toStrictEqual({}));
  });
  test('close', () => {
    expect(serverLambda.close()).toBe(undefined);
  });
});
