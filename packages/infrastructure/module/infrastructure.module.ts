import { DynamicModule, Module } from '@nestjs/common';
import { CoreOutputFactory } from './../factory/core-output.factory';
import { AtlasConfig } from '../config/atlas.config';
import { AppFactory } from '../factory/app.factory';
import { ConfigFactory } from '../factory/config.factory';
import { CoreFactory } from '../factory/core.factory';
import { HttpFactory } from '../factory/http.factory';

@Module({})
export class InfrastructureModule {
    public static forCore(atlasConfig?: AtlasConfig,): DynamicModule {
        return {
            module: InfrastructureModule,
            providers: [
                ConfigFactory(atlasConfig),
                AppFactory,
                CoreFactory,
            ],
        };
    }
    public static forHttp(atlasConfig?: AtlasConfig,): DynamicModule {
        return {
            module: InfrastructureModule,
            providers: [
                ConfigFactory(atlasConfig),
                AppFactory,
                CoreOutputFactory,
                HttpFactory,
            ],
        };
    }
}