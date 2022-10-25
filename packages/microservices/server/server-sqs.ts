import {
  CustomTransportStrategy,
} from '@nestjs/microservices/interfaces';
import { Server } from '@nestjs/microservices/server';
import { TRANSPORT_METADATA_EVENT_DRIVEN } from '../constants';
import { firstValueFrom, Observable } from 'rxjs';

export class ServerSqs extends Server implements CustomTransportStrategy {
  listen(callback: () => void) {
    callback();
  }
  getTransport() {
    return TRANSPORT_METADATA_EVENT_DRIVEN;
  }
  async handler(event) {
    const records = event.Records.
      map((payload) => {
        const event = JSON.parse(payload.body);
        return {
          topic: event.source,
          message: {
            key: event.id,
            value: event.detail,
            timestamp: event.time,
            size: null,
            attributes: null,
            offset: null,
          },
        };
      });
    return Promise.all(
      records.map((payload) => this.handlerItem(payload))
    );
  }
  async handlerItem(payload: any) {
    const handler = this.getHandlerByPattern(payload.topic);
    if (!handler) {
      return;
    }
    const execution = handler(payload.message);
    if (execution instanceof Observable) {
      return await firstValueFrom(execution);
    }
    return await execution;
  }
  close() {
    console.log('close server sqs');
  }
}