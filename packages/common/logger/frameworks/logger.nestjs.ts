import { Injectable, LoggerService, Scope } from '@nestjs/common';
import { AtlasProtoLogger } from '../logger';

@Injectable({scope: Scope.TRANSIENT})
export class AtlasNestLogger extends AtlasProtoLogger implements LoggerService {

    lambdaMode: boolean;
    lambdaContext: string;

    constructor() {
        super();
    }

    log(message: string, nestModuleContext?: string){       
        this.printMessage(this.formatMessage(message, nestModuleContext)); 
        return; 
    }

    formatMessage(message: string, nestModuleContext?: string): string  {
        const result = `[Atlas] ${this.lambdaMode ? `[${this.lambdaContext}]` : '' } [${nestModuleContext ?? ''}] :: ${message}\n`
        return result;
    }

    setLambdaMode(config: boolean){
        this.lambdaMode = config;
    }

    setLambdaContext(context: string) {
        this.lambdaContext = context;
    }

    getLambdaContext(context: string) {
        return this.lambdaContext;
    }

    

}