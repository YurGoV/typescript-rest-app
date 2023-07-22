import { Logger, ILogObj } from 'tslog'

//TODO: setup logger on current major (4th) version
export class LoggerService {
    public logger: Logger<ILogObj>

    constructor() {
        this.logger = new Logger<ILogObj>({
            // displayInstanceName: false,
            // displayLoggerName: false,
            // displayFilePath: 'hidden',
            // displayFunctionName: false,
        })
    }

    log(...args: unknown[]){
        this.logger.info(...args)
    }
    error(...args: unknown[]){
        this.logger.error(...args)
    }
    warn(...args: unknown[]){
        this.logger.warn(...args)
    }
}
