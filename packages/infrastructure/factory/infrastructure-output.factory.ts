import { validateOrReject } from "class-validator";
import { readFileSync } from 'fs';
import { AtlasCoreOutput } from "../output/core.output";
import { CORE_OUTPUT } from "../constants";

export const InfrastructureOutputFactory = {
    provide: CORE_OUTPUT,
    useFactory: async () => {
        const { AtlasCoreStack } = JSON.parse(readFileSync('atlas-core-artifact.json', 'utf-8'));
        const coreOutput = new AtlasCoreOutput();
        Object.assign(coreOutput, AtlasCoreStack)
        try {
            await validateOrReject(coreOutput);
        } catch (err) {
            console.log('Core output is not valid. Errors: ', err);
            process.exit(1);
        }
        return coreOutput;
    },
};