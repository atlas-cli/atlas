import { NestFactory } from '@nestjs/core';
import { AppFactory } from './factory/app.factory';
import { AtlasConfig } from './config/atlas.config';
import { InfrastructureModule } from './module/infrastructure.module';
import { INestApplicationContext, Logger } from '@nestjs/common';
import { DEFAULT_NESTJS_INFRAESTRUCTURE_OPTIONS, DEFAULT_NESTJS_APPLICATION_OPTIONS } from './constants'; 

export class Atlas {
    constructor(
        private config?: AtlasConfig,
    ) { }
    async bootstrap() {
        let app: INestApplicationContext;
        if (process.argv[process.argv.length - 2] === 'build') {
            if (process.argv[process.argv.length - 1] === 'application') {
                app = await this.forApplication();
            }
        }
        if (app === undefined) {
            app = await this.forInfrastructure();
        }
                
        Logger.log('Starting infratructure synth process', 'CDK::Bootstrap');

        // Run CDK synth
        await app.get(AppFactory).synth();
    }
    async forInfrastructure() {
        return await NestFactory.createApplicationContext(
            InfrastructureModule.forInfrastructure(this.config),
            DEFAULT_NESTJS_INFRAESTRUCTURE_OPTIONS
        );
    }
    async forApplication() {
        return await NestFactory.createApplicationContext(
            InfrastructureModule.forApplication(this.config),
            DEFAULT_NESTJS_APPLICATION_OPTIONS
        );
    }
}