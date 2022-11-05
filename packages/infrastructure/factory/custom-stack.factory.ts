import { AtlasConfig } from "./../config";
import { CONFIG, STACKS } from "./../constants";
import { AppFactory } from "./app.factory";

export const CustomStackFactory = (factory: (app: AppFactory, config: AtlasConfig,) => any,) => {
    return {
        provide: STACKS,
        inject: [AppFactory,CONFIG,],
        useFactory: factory,
    };
}
