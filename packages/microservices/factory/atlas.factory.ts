import { Handler, Context } from 'aws-lambda';
import { Server } from 'http';
import { createServer, proxy } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AtlasLogger } from '@atlas/infrastructure/logger/atlas.logger';
import * as express from 'express';

let cachedApplicationStandalone: Server;
const binaryMimeTypes: string[] = [];

export class AtlasFactory {
    public static create(module: any): Handler {
        return async (event: any, context: Context) => {
            cachedApplicationStandalone = await this.buildApplicationProxy(module);
            return proxy(cachedApplicationStandalone, event, context, 'PROMISE').promise;
        }
    }
    static async buildApplicationProxy(module: any): Promise<Server> {
        if (!cachedApplicationStandalone) {
            const expressApplication = express();
            const nestApplication = await NestFactory.create(module, new ExpressAdapter(expressApplication));
            const logger = await new AtlasLogger('LambdaLogger', {}, 'CONTEXTID01' ); // to be replaced by a random hash
            logger.setCurrentLambdaContext('TESTELAMBDAID1');
            logger.setLambdaMode(true);
            logger.log('testing context, should work');
            nestApplication.useLogger(logger);
            nestApplication.use(eventContext());
            await nestApplication.init();
            cachedApplicationStandalone = createServer(expressApplication, undefined, binaryMimeTypes);
        }
        return cachedApplicationStandalone;
    }
}