import { validateOrReject } from "class-validator";
import { AtlasConfig } from "./../config/atlas.config";
import { CONFIG } from "./../constants";

export const ConfigFactory = (atlasConfig?: AtlasConfig,) => {
    return {
        provide: CONFIG,
        useFactory: async () => {
            try {
                await validateOrReject(atlasConfig);
            } catch (err) {
                console.log('Caught promise rejection (validation failed). Errors: ', err);
                process.exit(1);
            }
            return atlasConfig;
        },
    };
}