import { Injectable } from "@nestjs/common";
import { AtlasCoreStack } from "./../stack";
import { AppFactory } from "./app.factory";

@Injectable()
export class CoreFactory {
    constructor(app: AppFactory) {
        new AtlasCoreStack(app, 'AtlasCoreStack');
    }
}