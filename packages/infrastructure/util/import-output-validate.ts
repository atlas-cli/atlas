import { readFileSync } from 'fs';
import { AtlasCoreOutput } from './../output/core.output';

export const importOutputValidate = () => {
    const { AtlasCoreStack } = JSON.parse(readFileSync('atlas-core-artifact.json', 'utf-8'));
    const atlasCoreOutput = new AtlasCoreOutput();
    Object.assign(atlasCoreOutput, AtlasCoreStack);
    return atlasCoreOutput;
}