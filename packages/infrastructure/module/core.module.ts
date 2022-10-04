import { DynamicModule, Module } from "@nestjs/common";
import { AtlasConfig } from "./../config/atlas.config";
import { InfrastructureModule } from "./infrastructure.module";

@Module({
    imports: [],
})
export class CoreModule {
    static fromConfig(atlasConfig?: AtlasConfig,): DynamicModule {
        return InfrastructureModule.forCore(atlasConfig);
    }
}