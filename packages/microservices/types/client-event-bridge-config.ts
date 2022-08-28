import { EventBridgeClientConfig, } from '@aws-sdk/client-eventbridge';

export interface ClientEventBridgeConfig {
    aws: EventBridgeClientConfig;
    eventBusName: string;
    detailType?: string;
}