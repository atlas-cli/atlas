export class AtlasProtoLogger {

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

    protected printMessage(message: string, printMode?: 'stderr' | 'stdout') {
        process[printMode ?? 'stdout'].write(message);
    }
    
    formatMessage(message: string){
        return `Atlas Basic Log:: ${message}\n`
    }
}