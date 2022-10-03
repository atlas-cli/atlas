import { Injectable } from "@nestjs/common";
import { AtlasHttpStack } from "./../stack";
import { AppFactory } from "./app.factory";
import { readFileSync } from 'fs';

@Injectable()
export class HttpFactory {
    constructor(app: AppFactory) {
        const { AtlasCoreStack } = JSON.parse(readFileSync('atlas-core-artifact.json', 'utf-8'));
        new AtlasHttpStack(app, 'AtlasHttpStack', {}, AtlasCoreStack);
    }
}