import { Length } from "class-validator";

export class AtlasCoreOutput {
    @Length(8, 10)
    atlasKey: string;
}