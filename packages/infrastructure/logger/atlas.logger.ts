
import { ConsoleLogger, ConsoleLoggerOptions, Logger, LoggerService, Scope, Injectable } from '@nestjs/common';

export type LogLevel = 'log' | 'error' | 'warn' | 'debug' | 'verbose' | 'custom';
export const isString = (val: any): val is string => typeof val === 'string';
const logLevels: LogLevel[] = [];

@Injectable({scope: Scope.TRANSIENT})
export class AtlasLogger extends ConsoleLogger implements LoggerService {
    _lastTimestampAt: number;
    _originalContext: string;

    currentLambdaContext: string;
    lambdaMode: boolean;

    constructor(context?: string, options?: ConsoleLoggerOptions, currentLambdaContext?: string) {
        super()['custom'] = this.custom;
    }

    log(message: any, ...optionalParams: any[]) {
        if (!this.isLevelEnabled('log')) {
            return;
        }
        // if (typeof(message) == 'string') {
        //     message = [message];
        // } 
        const { messages, context } = this._getContextAndMessagesToPrint([
            message,
            ...optionalParams,
        ]);

        // console.log(optionalParams)
        this.printMessages(messages, context, 'log');
    }

    custom(message: any, ...optionalParams: any[]) {
        if (!this._isLevelEnabled('custom')) {
            return;
        }
        const { messages, context } = this._getContextAndMessagesToPrint([
            message,
            ...optionalParams,
        ]);

        this.printMessages(messages, context, 'custom');
    }

    /**
     * Write an 'error' level log.
     */
    error(message: any, ...optionalParams: any[]) {
        if (!this.isLevelEnabled('error')) {
            return;
        }
        const { messages, context } = this._getContextAndMessagesToPrint([
            message,
            ...optionalParams,
        ]);
        this.printMessages(messages, context, 'error');
    }

    /**
     * Write a 'warn' level log.
     */
    warn(message: any, ...optionalParams: any[]) {
        if (!this.isLevelEnabled('warn')) {
            return;
        }
        const { messages, context } = this._getContextAndMessagesToPrint([
            message,
            ...optionalParams,
        ]);
        this.printMessages(messages, context, 'warn');
    }

    /**
     * Write a 'debug' level log.
     */
    debug(message: any, ...optionalParams: any[]) {
        if (!this.isLevelEnabled('debug')) {
            return;
        }
        const { messages, context } = this._getContextAndMessagesToPrint([
            message,
            ...optionalParams,
        ]);
        this.printMessages(messages, context, 'debug');
    }

    /**
     * Write a 'verbose' level log.
     */
    verbose(message: any, ...optionalParams: any[]) {
        if (!this.isLevelEnabled('verbose')) {
            return;
        }
        const { messages, context } = this._getContextAndMessagesToPrint([
            message,
            ...optionalParams,
        ]);
        this.printMessages(messages, context, 'verbose');
    }

    public setCurrentLambdaContext(id: string) {
        this.currentLambdaContext = id;
    }

    public getCurrentLambdaContext(): string {
        return this.currentLambdaContext;
    }

    public setLambdaMode(mode: boolean) {
        this.lambdaMode = mode;
    }

    protected colorize(message: string, logLevel: LogLevel) {
        const color = this._getColorByLogLevel(logLevel);
        return color(message);
    }

    protected printMessages(
        messages: unknown[],
        context = '',
        logLevel: LogLevel = 'log',
        writeStreamType?: 'stdout' | 'stderr',
    ) {
        messages.forEach(message => {
            const pidMessage = this.lambdaMode ? this.formatPidLambda(this.currentLambdaContext) : this.formatPid(process.pid);
            const contextMessage = this.formatContext(context);
            const timestampDiff = this._updateAndGetTimestampDiff();
            const formattedLogLevel = logLevel.toUpperCase().padStart(3, ' ');
            const formattedMessage = this.formatMessage(
                logLevel,
                message,
                pidMessage,
                formattedLogLevel,
                contextMessage,
                timestampDiff,
            );

            process[writeStreamType ?? 'stdout'].write(formattedMessage);
        });
    }

    private _getContextAndMessagesToPrint(args: unknown[]) {
        if (args?.length <= 1) {
            return { messages: args, context: this.context };
        }
        const lastElement = args[args.length - 1];
        const isContext = isString(lastElement);
        if (!isContext) {
            return { messages: args, context: this.context };
        }
        return {
            context: lastElement as string,
            messages: args.slice(0, args.length - 1),
        };
    }

    protected formatPid(pid: number) {
        return `${pid} - [Atlas]`;
    }

    protected formatPidLambda(contextId: string): string {
        return `${contextId} - [Atlas]`;
    }

    protected formatContext(context: string): string {
        // context ? console.log(context) : null;
        return context ? clc.blue(`[${context}] `) : '';
    }

    protected formatMessage(
        logLevel: LogLevel,
        message: unknown,
        pidMessage: string,
        formattedLogLevel: string,
        contextMessage: string,
        timestampDiff: string,
    ) {
        const output = this._stringifyMessage(message, logLevel);
        pidMessage = this.colorize(pidMessage, logLevel);
        formattedLogLevel = this.colorize(formattedLogLevel, logLevel);
        return `${this.getTimestamp()} ${pidMessage} ${contextMessage} ${formattedLogLevel} ${output}${timestampDiff}\n`;
    }


    protected _stringifyMessage(message: unknown, logLevel: LogLevel) {
        return isPlainObject(message) || Array.isArray(message)
            ? `${this.colorize('Object:', logLevel)}\n${JSON.stringify(
                message,
                (key, value) =>
                    typeof value === 'bigint' ? value.toString() : value,
                2,
            )}\n`
            : this.colorize(message as string, logLevel);
    }

    private _updateAndGetTimestampDiff(): string {
        const includeTimestamp =
            this._lastTimestampAt && this.options?.timestamp;
        const result = includeTimestamp
            ? this.formatTimestampDiff(Date.now() - this._lastTimestampAt)
            : '';
        this._lastTimestampAt = Date.now();
        return result;
    }

    protected formatTimestampDiff(timestampDiff: number) {
        return clc.yellow(` +${timestampDiff}ms`);
    }


    _isLevelEnabled(level: LogLevel): boolean {
        const logLevels = this.options?.logLevels;
        return isLogLevelEnabled(level, logLevels);
    }

    private _getColorByLogLevel(level: LogLevel) {
        switch (level) {
            case 'debug':
                return clc.magentaBright;
            case 'warn':
                return clc.yellow;
            case 'error':
                return clc.red;
            case 'verbose':
                return clc.cyanBright;
            case 'custom':
                return clc.blue;
            default:
                return clc.green;
        }
    }


}


type ColorTextFn = (text: string) => string;

const isColorAllowed = () => !process.env.NO_COLOR;
const colorIfAllowed = (colorFn: ColorTextFn) => (text: string) =>
    isColorAllowed() ? colorFn(text) : text;

export const clc = {
    bold: colorIfAllowed((text: string) => `\x1B[1m${text}\x1B[0m`),
    green: colorIfAllowed((text: string) => `\x1B[32m${text}\x1B[39m`),
    yellow: colorIfAllowed((text: string) => `\x1B[33m${text}\x1B[39m`),
    red: colorIfAllowed((text: string) => `\x1B[31m${text}\x1B[39m`),
    magentaBright: colorIfAllowed((text: string) => `\x1B[95m${text}\x1B[39m`),
    cyanBright: colorIfAllowed((text: string) => `\x1B[96m${text}\x1B[39m`),
    blue: colorIfAllowed((text: string) => `\x1b[34m${text}\x1b[34m`),

};

export const isUndefined = (obj: any): obj is undefined =>
    typeof obj === 'undefined';

export const isObject = (fn: any): fn is object =>
    !isNil(fn) && typeof fn === 'object';


export const isPlainObject = (fn: any): fn is object => {
    if (!isObject(fn)) {
        return false;
    }
    const proto = Object.getPrototypeOf(fn);
    if (proto === null) {
        return true;
    }
    const ctor =
        Object.prototype.hasOwnProperty.call(proto, 'constructor') &&
        proto.constructor;
    return (
        typeof ctor === 'function' &&
        ctor instanceof ctor &&
        Function.prototype.toString.call(ctor) ===
        Function.prototype.toString.call(Object)
    );
};


export const normalizePath = (path?: string): string =>
    path
        ? path.startsWith('/')
            ? ('/' + path.replace(/\/+$/, '')).replace(/\/+/g, '/')
            : '/' + path.replace(/\/+$/, '')
        : '/';

export const stripEndSlash = (path: string) =>
    path[path.length - 1] === '/' ? path.slice(0, path.length - 1) : path;

export const isFunction = (val: any): boolean => typeof val === 'function';
export const isNumber = (val: any): val is number => typeof val === 'number';
export const isConstructor = (val: any): boolean => val === 'constructor';
export const isNil = (val: any): val is null | undefined =>
    isUndefined(val) || val === null;
export const isEmpty = (array: any): boolean => !(array && array.length > 0);
export const isSymbol = (val: any): val is symbol => typeof val === 'symbol';



const LOG_LEVEL_VALUES: Record<LogLevel, number> = {
    debug: 0,
    verbose: 1,
    log: 2,
    warn: 3,
    error: 4,
    custom: 5
};

/**
 * Checks if target level is enabled.
 * @param targetLevel target level
 * @param logLevels array of enabled log levels
 */
export function isLogLevelEnabled(
    targetLevel: LogLevel,
    logLevels: LogLevel[] | undefined,
): boolean {
    if (!logLevels || (Array.isArray(logLevels) && logLevels?.length === 0)) {
        return false;
    }
    if (logLevels.includes(targetLevel)) {
        return true;
    }
    const highestLogLevelValue = logLevels
        .map(level => LOG_LEVEL_VALUES[level])
        .sort((a, b) => b - a)?.[0];

    const targetLevelValue = LOG_LEVEL_VALUES[targetLevel];
    return targetLevelValue >= highestLogLevelValue;
}