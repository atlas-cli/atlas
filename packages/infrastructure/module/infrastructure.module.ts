import { DynamicModule, Module } from '@nestjs/common';
import { AppFactory } from '../factory/app.factory';
import { CoreFactory } from '../factory/core.factory';
import { HttpFactory } from '../factory/http.factory';

@Module({})
export class InfrastructureModule {
    public static forCore(): DynamicModule {
        return {
            module: InfrastructureModule,
            providers: [
                AppFactory,
                CoreFactory,
            ],
        };
    }
    public static forHttp(): DynamicModule {
        return {
            module: InfrastructureModule,
            providers: [
                AppFactory,
                HttpFactory,
            ],
        };
    }
}