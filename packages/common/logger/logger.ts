import { ConsoleLogger, LoggerService } from '@nestjs/common';
import { LogLevel } from './logger.constants';

const logLevels: LogLevel[] = [];

export class AtlasLogger implements LoggerService{

    log(message: string){
        this.printMessage(this.formatMessage(message));
    }

    warn(message: string){
        this.printMessage(this.formatMessage(message));
    }

    error(message: string){
        this.printMessage(message, 'stderr');
    }

    debug(message: string){
        this.printMessage(this.formatMessage(message));
    }

    verbose(message: string){
        this.printMessage(this.formatMessage(message));
    }

    printMessage(message: string, printMode?: 'stderr' | 'stdout') {
        process[printMode ?? 'stdout'].write(message);
    }

    formatMessage(message: string){
        return `Atlas base log - ${message}\n`
    }
}