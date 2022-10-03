import { Injectable } from "@nestjs/common";
import { App } from "aws-cdk-lib";

@Injectable()
export class AppFactory extends App {
    constructor() {
        super();
    }
}