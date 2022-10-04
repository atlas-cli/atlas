import { AppFactory } from "factory";
import { Length } from 'class-validator';

export class AtlasConfig {
    @Length(5, 55)
    name: string;
    
    core?: StackExecution;
    http?: StackExecution;
}

export interface StackExecution {
    before?: (AppFactory) => void;
    after?: (AppFactory) => void;
}