import { ClientProxy, ReadPacket } from '@nestjs/microservices';
import { from, map, Observable, switchMap, throwError as _throw, } from 'rxjs';
import { EventBridgeClient, PutEventsCommand, PutEventsCommandInput } from '@aws-sdk/client-eventbridge';
import { ClientEventBridgeConfig } from './../types/client-event-bridge-config';
import { DEFAULT_DETAIL_TYPE } from './../contants';

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
    emit<TResult = any, TInput = any>(source: string, detail: TInput): Observable<TResult> {
        const command: PutEventsCommandInput = {
            Entries: [
                {
                    Source: source,
                    EventBusName: this.options.eventBusName,
                    DetailType: this.options.detailType ?? DEFAULT_DETAIL_TYPE,
                    Time: new Date(),
                    Detail: JSON.stringify(detail),
                },
            ]
        };
        const event = () => from(this.client.send(new PutEventsCommand(command)));
        return from(this.connect())
            .pipe(
                switchMap(() => event()),
                map((_: any) => _)
            );
    }
    async dispatchEvent(_: ReadPacket<any>): Promise<any> {
        console.log('not implemented');
        return {};
    }
    publish(): () => void {
        return () => {
            console.log('not implemented');
        };
    }
}