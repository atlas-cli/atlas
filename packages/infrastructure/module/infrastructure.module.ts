import { DynamicModule, Module } from '@nestjs/common';
import { InfrastructureOutputFactory } from '../factory/infrastructure-output.factory';
import { AtlasConfig } from '../config/atlas.config';
import { AtlasLoggerModule } from '../logger/atlas.logger.module';
import { AppFactory } from '../factory/app.factory';
import { ConfigFactory } from '../factory/config.factory';
import { DEFAULT_APPLICATION_STACKS, DEFAULT_INFRASTRUCTURE_STACKS } from './../constants';

@Module({
})
export class InfrastructureModule {
    public static forInfrastructure(atlasConfig?: AtlasConfig,): DynamicModule {
        return {
            imports: [AtlasLoggerModule],
            module: InfrastructureModule,
            providers: [
                ConfigFactory(atlasConfig),
                AppFactory,
                ...(atlasConfig.infrastructures ?? DEFAULT_INFRASTRUCTURE_STACKS),
            ],
        };
    }
    public static forApplication(atlasConfig?: AtlasConfig,): DynamicModule {
        return {
            imports: [AtlasLoggerModule],
            module: InfrastructureModule,
            providers: [
                ConfigFactory(atlasConfig),
                AppFactory,
                InfrastructureOutputFactory,
                ...(atlasConfig.applications ?? DEFAULT_APPLICATION_STACKS),
            ],
        };
    }
}