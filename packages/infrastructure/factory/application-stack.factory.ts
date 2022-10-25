import { AtlasConfig } from "./../config";
import { CONFIG } from "./../constants";
import { AtlasCoreOutput } from "./../output/core.output";
import { CORE_OUTPUT, STACKS } from "./../constants";
import { AppFactory } from "./app.factory";

export const ApplicationStackFactory = (stack: any, name?: string,) => {
    return {
        provide: STACKS,
        inject: [AppFactory, CONFIG, CORE_OUTPUT],
        useFactory: (
            app: AppFactory,
            _?: AtlasConfig,
            atlasCoreOutput?: AtlasCoreOutput,
        ) => {
            const instance = new stack(app, name ?? stack.name, {}, atlasCoreOutput);
            return instance;
        },
    };
}
