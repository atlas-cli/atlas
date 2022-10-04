import { Inject, Injectable } from "@nestjs/common";
import { AtlasConfig } from "./../config/atlas.config";
import { CONFIG } from "./../constants";
import { AtlasCoreStack } from "./../stack";
import { AppFactory } from "./app.factory";

@Injectable()
export class CoreFactory {
    constructor(app: AppFactory, @Inject(CONFIG) atlasConfig?: AtlasConfig,) {
        if (atlasConfig?.core?.before !== undefined) {
            atlasConfig?.core?.before(app);
        }
        new AtlasCoreStack(app, 'AtlasCoreStack');
        if (atlasConfig?.core?.after !== undefined) {
            atlasConfig?.core?.after(app);
        }
    }
}