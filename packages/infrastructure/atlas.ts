import { NestFactory } from '@nestjs/core';
import { AppFactory } from './factory/app.factory';
import { HttpModule } from './module/http.module';
import { CoreModule } from './module/core.module';

export class Atlas {
    async bootstrap() {
        console.log(process.argv);
        if(process.argv[process.argv.length - 2] === 'deploy') {
            if(process.argv[process.argv.length - 1] === 'core') {
                const app = await this.core();
                app.get(AppFactory).synth();
                return;
            }
            if(process.argv[process.argv.length - 1] === 'http') {
                const app = await this.http();
                app.get(AppFactory).synth();
                return;
            }
        }
        console.error('command invalid');
    }
    async core() {
        return await NestFactory.createApplicationContext(CoreModule);
    }
    async http() {
        return await NestFactory.createApplicationContext(HttpModule);
    }
}