import { CustomTransportStrategy, Server } from '@nestjs/microservices';
import { TRANSPORT_METADATA_REQUEST_RESPONSE } from '../constants';

export class ServerLambda extends Server implements CustomTransportStrategy {
  listen(callback: () => void) {
    callback();
  }
  getTransport() {
    return TRANSPORT_METADATA_REQUEST_RESPONSE;
  }
  async handler(event) {
    const handler = this.getHandlerByPattern(event.topic);
    if (!handler) {
      return;
    }
    return await handler(event.value);
  }
  close() {
    console.log('close server lambda');
  }
}