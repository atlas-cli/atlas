import 'reflect-metadata';
import { of } from 'rxjs';
import { TRANSPORT_METADATA_EVENT_DRIVEN } from '../../contants';
import { ServerSqs } from './../../server/server-sqs';

describe('Server sqs', () => {
  const serverSqs = new ServerSqs();
  test('listen method', async () => {
    serverSqs.listen(() => expect(undefined).toBe(undefined));
  });
  test('get transport', async () => {
    expect(serverSqs.getTransport()).toBe(TRANSPORT_METADATA_EVENT_DRIVEN);
  });
  test('handler no records', async () => {
    serverSqs.handler({
      Source: 'topic-name',
      Records: [],
    }).then((value) => expect(value).toBeDefined());
  });
  test('handler records bug handler not exists', async () => {
    serverSqs.handler({
      Records: [
        {
          body: '{"version":"0","id":"03e2f63b-111b-17f7-e01e-9709e320d3a7","detail-type":"transaction","source":"event-name","account":"217904959673","time":"2022-08-11T05:57:09Z","region":"sa-east-1","resources":[],"detail":{"payload":"payload-value"}}',
        }
      ]
    }).then((value) => expect(value).toStrictEqual([undefined]));
  });
  test('handler lambda and handler exists', async () => {
    serverSqs.getHandlerByPattern = (_) => {
      return async () => {
        return {};
      };
    }
    serverSqs.handler({
      Records: [
        {
          body: '{"version":"0","id":"03e2f63b-111b-17f7-e01e-9709e320d3a7","detail-type":"transaction","source":"event-name","account":"217904959673","time":"2022-08-11T05:57:09Z","region":"sa-east-1","resources":[],"detail":{"payload":"payload-value"}}',
        }
      ]
    }).then((value) => expect(value).toStrictEqual([{}]));
  });

  test('handler lambda and handler exists and observable', async () => {
    serverSqs.getHandlerByPattern = (_) => {
      return () => of({}) as any;
    }
    serverSqs.handler({
      Records: [
        {
          body: '{"version":"0","id":"03e2f63b-111b-17f7-e01e-9709e320d3a7","detail-type":"transaction","source":"event-name","account":"217904959673","time":"2022-08-11T05:57:09Z","region":"sa-east-1","resources":[],"detail":{"payload":"payload-value"}}',
        }
      ]
    }).then((value) => expect(value).toStrictEqual([{}]));
  });
  test('close', () => {
    expect(serverSqs.close()).toBe(undefined);
  });
});
