import { Inject, Injectable } from "@nestjs/common";
import { AtlasHttpStack } from "./../stack";
import { AppFactory } from "./app.factory";
import { CONFIG, CORE_OUTPUT, } from "./../constants";
import { AtlasConfig } from "./../config/atlas.config";
import { AtlasCoreOutput } from "./../output/core.output";

@Injectable()
export class HttpFactory {
    constructor(
        app: AppFactory,
        @Inject(CONFIG) atlasConfig?: AtlasConfig,
        @Inject(CORE_OUTPUT) atlasCoreOutput?: AtlasCoreOutput,
    ) {
        if (atlasConfig?.http?.before !== undefined) {
            atlasConfig?.http?.before(app);
        }
        new AtlasHttpStack(app, 'AtlasHttpStack', {}, atlasCoreOutput);
        if (atlasConfig?.http?.after !== undefined) {
            atlasConfig?.http?.after(app);
        }
    }
}