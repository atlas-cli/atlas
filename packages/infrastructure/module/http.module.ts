import { DynamicModule, Module } from "@nestjs/common";
import { AtlasConfig } from "config/atlas.config";
import { InfrastructureModule } from "./infrastructure.module";

@Module({
    imports: [],
})
export class HttpModule {
    static fromConfig(atlasConfig?: AtlasConfig,): DynamicModule {
        return InfrastructureModule.forHttp(atlasConfig);
    }
}