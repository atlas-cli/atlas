import { ClientProxy, ReadPacket, WritePacket } from '@nestjs/microservices';
import { throwError as _throw, } from 'rxjs';
import { EventBridgeClient, PutEventsCommand, PutEventsCommandInput } from '@aws-sdk/client-eventbridge';
import { ClientEventBridgeConfig } from './../types/client-event-bridge-config';
import { DEFAULT_DETAIL_TYPE } from '../constants';

export class ClientEventBridge extends ClientProxy {
    client: EventBridgeClient;
    constructor(protected readonly options: ClientEventBridgeConfig,) {
        super();
        this.client = new EventBridgeClient(this.options.aws);
    }
    async connect(): Promise<any> {
        return;
    }
    close() {
        this.client = undefined;
    }
    async dispatchEvent({ pattern, data }: ReadPacket<any>): Promise<any> {
        const command: PutEventsCommandInput = {
            Entries: [
                {
                    Source: pattern,
                    EventBusName: this.options.eventBusName,
                    DetailType: this.options.detailType ?? DEFAULT_DETAIL_TYPE,
                    Time: new Date(),
                    Detail: JSON.stringify(data),
                },
            ]
        };
        return this.client.send(new PutEventsCommand(command));
    }
    publish(
        packet: ReadPacket<any>,
        callback: (packet: WritePacket<any>) => void,
    ) {
        console.log('AWS Event-Bridge and sqs don\´t support request-response. ');
        setTimeout(() => callback({ response: packet.data }), 5000);
        return () => undefined;
    }
}