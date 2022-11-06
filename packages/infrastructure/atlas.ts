import { NestFactory } from '@nestjs/core';
import { AppFactory } from './factory/app.factory';
import { AtlasConfig } from './config/atlas.config';
import { AtlasLogger } from './logger/atlas.logger';
import { InfrastructureModule } from './module/infrastructure.module';
import { INestApplicationContext } from '@nestjs/common';

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
        // Run CDK synth
        await app.get(AppFactory).synth();
    }
    async forInfrastructure() {
        return await NestFactory.createApplicationContext(
            InfrastructureModule.forInfrastructure(this.config),
            {
                logger: new AtlasLogger()
            }
        );
    }
    async forApplication() {
        return await NestFactory.createApplicationContext(
            InfrastructureModule.forApplication(this.config),
            {
                logger: new AtlasLogger()
            }
        );
    }
}