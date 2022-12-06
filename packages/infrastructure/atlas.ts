import { NestFactory } from '@nestjs/core';
import { AppFactory } from './factory/app.factory';
import { AtlasConfig } from './config/atlas.config';
import { AtlasLogger } from './logger/atlas.logger';
import { InfrastructureModule } from './module/infrastructure.module';
import { INestApplicationContext, Logger } from '@nestjs/common';

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
        const result = await app.get(AppFactory).synth();
    }
    async forInfrastructure() {
        return await NestFactory.createApplicationContext(
            InfrastructureModule.forInfrastructure(this.config),
            {
                logger: new AtlasLogger('Infrastructure')
            }
        );
    }
    async forApplication() {
        return await NestFactory.createApplicationContext(
            InfrastructureModule.forApplication(this.config),
            {
                logger: new AtlasLogger('Application')
            }
        );
    }
}