import { ClientProxy, ReadPacket, RpcException, WritePacket } from '@nestjs/microservices';
import { LambdaClient, InvokeCommand, } from '@aws-sdk/client-lambda';
import { throwError as _throw, } from 'rxjs';
import { ClientLambdaConfig } from './../types/client-lambda-config';

declare const TextEncoder: any

export class ClientLambda extends ClientProxy {
    client: LambdaClient;
    constructor(protected readonly options: ClientLambdaConfig,) {
        super();
        this.client = new LambdaClient(
            this.options.aws,
        );
    }
    async connect(): Promise<any> {
        return {};
    }

    async close() {
        this.client = null;
    }

    dispatchEvent(packet: ReadPacket<any>): Promise<any> {
        return new Promise((next, error) => {
            return this.handlerLambda(packet, 'DryRun', (response) => {
                if (response.err !== undefined) error(new RpcException(response.err));
                if (response.response !== undefined) {
                    next(response.response);
                }
            });
        });
    }
    publish(
        packet: ReadPacket<any>,
        callback: (packet: WritePacket<any>) => void,
    ): any {
        this.handlerLambda(packet, 'RequestResponse', callback);
    }
    handlerLambda(
        packet: ReadPacket<any>,
        InvocationType: 'RequestResponse' | 'DryRun',
        callback?: (packet: WritePacket<any>) => void,
    ) {
        const pattern = this.normalizePattern(packet.pattern);
        const payload = {
            topic: pattern,
            value: packet.data,
        }
        const params = {
            FunctionName: this.options.functionName,
            InvocationType,
            Payload: this.serialize(JSON.stringify(payload))
        };
        const command = new InvokeCommand(params);
        this.client.send(command).then(
            (event) => {
                const u8 = new Uint8Array(event.Payload);
                const response: any = JSON.parse(Buffer.from(u8).toString());
                if (response.errorMessage !== undefined) {
                    return callback({ err: new RpcException(response.errorMessage) })
                };
                callback({ response });
            },
            (err) => {
                callback({ err: new RpcException(err) });
            }
        );
    }
    serialize(response: string) {
        return new TextEncoder().encode(response);
    }
}