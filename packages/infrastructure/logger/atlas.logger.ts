
import { ConsoleLogger, Logger } from '@nestjs/common';

export type LogLevel = 'log' | 'error' | 'warn' | 'debug' | 'verbose';
export const isString = (val: any): val is string => typeof val === 'string';


export class AtlasLogger extends ConsoleLogger {
    _lastTimestampAt: number;
    _originalContext: string;


    log(message: any, ...optionalParams: any[]) {
        if (!this.isLevelEnabled('log')) {
            return;
        }
        const { messages, context } = this._getContextAndMessagesToPrint([
            message,
            ...optionalParams,
        ]);
        this.printMessages(messages, context, 'log');
    }

    /**
     * Write an 'error' level log.
     */
    error(message: any, ...optionalParams: any[]) {
        if (!this.isLevelEnabled('log')) {
            return;
        }
        const { messages, context } = this._getContextAndMessagesToPrint([
            message,
            ...optionalParams,
        ]);
        this.printMessages(messages, context, 'log');
     }

    /**
     * Write a 'warn' level log.
     */
    warn(message: any, ...optionalParams: any[]) {
        if (!this.isLevelEnabled('log')) {
            return;
        }
        const { messages, context } = this._getContextAndMessagesToPrint([
            message,
            ...optionalParams,
        ]);
        this.printMessages(messages, context, 'log');
    }

    /**
     * Write a 'debug' level log.
     */
    debug(message: any, ...optionalParams: any[]) {
        if (!this.isLevelEnabled('log')) {
            return;
        }
        const { messages, context } = this._getContextAndMessagesToPrint([
            message,
            ...optionalParams,
        ]);
        this.printMessages(messages, context, 'log');
    }

    /**
     * Write a 'verbose' level log.
     */
    verbose(message: any, ...optionalParams: any[]) {
        if (!this.isLevelEnabled('log')) {
            return;
        }
        const { messages, context } = this._getContextAndMessagesToPrint([
            message,
            ...optionalParams,
        ]);
        this.printMessages(messages, context, 'log');
    }

    protected printMessages(
        messages: unknown[],
        context = '',
        logLevel: LogLevel = 'log',
        writeStreamType?: 'stdout' | 'stderr',
    ) {
        messages.forEach(message => {
            const pidMessage = this.formatPid(process.pid);
            const contextMessage = this.formatContext(context);
            const timestampDiff = this._updateAndGetTimestampDiff();
            const formattedLogLevel = logLevel.toUpperCase().padStart(7, ' ');
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
        return `[Atlas] ${pid}  - `;
    }

    protected formatContext(context: string): string {
        return context ? yellow(`[${context}] `) : '';
    }

    protected formatMessage(
        logLevel: LogLevel,
        message: unknown,
        pidMessage: string,
        formattedLogLevel: string,
        contextMessage: string,
        timestampDiff: string,
    ) {
        const output = this.stringifyMessage(message, logLevel);
        pidMessage = this.colorize(pidMessage, logLevel);
        formattedLogLevel = this.colorize(formattedLogLevel, logLevel);
        return `${pidMessage}${this.getTimestamp()} ${formattedLogLevel} ${contextMessage}${output}${timestampDiff}\n`;
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
        return yellow(` +${timestampDiff}ms`);
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
};
export const yellow = colorIfAllowed(
    (text: string) => `\x1B[38;5;3m${text}\x1B[39m`,
);
