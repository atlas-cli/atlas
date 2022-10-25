import * as cdk from 'aws-cdk-lib';
import { STACKS } from "./../constants";
import { AppFactory } from "./app.factory";

export const StackFactory = (stack: typeof cdk.Stack, name?: string, ) => {
    return {
        provide: STACKS,
        inject: [AppFactory,],
        useFactory: (app: AppFactory,) => {
            const instance = new stack(app, name ?? stack.name, {});
            return instance;
        },
    };
}
