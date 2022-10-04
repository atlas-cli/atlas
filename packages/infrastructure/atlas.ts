import { NestFactory } from '@nestjs/core';
import { AppFactory } from './factory/app.factory';
import { HttpModule } from './module/http.module';
import { CoreModule } from './module/core.module';
import { AtlasConfig } from './config/atlas.config';
import { Module } from '@nestjs/common';

export class Atlas {
    constructor(
        private config?: AtlasConfig,
    ) { }
    async bootstrap() {
        if (process.argv[process.argv.length - 2] === 'deploy') {
            if (process.argv[process.argv.length - 1] === 'core') {
                const app = await this.core();
                app.get(AppFactory).synth();
                return;
            }
            if (process.argv[process.argv.length - 1] === 'http') {
                const app = await this.http();
                app.get(AppFactory).synth();
                return;
            }
        }
        console.error('command invalid');
    }
    async core() {
        @Module({
            imports: [
                CoreModule.fromConfig(this.config),
            ]
        })
        class AppModule { }
        return await NestFactory.createApplicationContext(AppModule);
    }
    async http() {
        @Module({
            imports: [
                HttpModule.fromConfig(this.config),
            ]
        })
        class AppModule { }
        return await NestFactory.createApplicationContext(AppModule);
    }
}