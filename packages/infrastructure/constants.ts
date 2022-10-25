import { StackFactory, ApplicationStackFactory } from "./factory";
import { AtlasCoreStack, AtlasLambdaHttpStack } from "./stack";

// Providers
export const CONFIG = 'CONFIG';
export const STACKS = 'STACKS';

// Outputs
export const CORE_OUTPUT = 'CORE_OUTPUT';

// Stacks
export const DEFAULT_INFRASTRUCTURE_STACKS = [
    StackFactory(AtlasCoreStack),
];
export const DEFAULT_APPLICATION_STACKS = [
    ApplicationStackFactory(AtlasLambdaHttpStack),
];