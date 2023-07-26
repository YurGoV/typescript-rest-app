import { Logger, ILogObj } from 'tslog'
import { inject, injectable } from "inversify";
import 'reflect-metadata'

//TODO: setup logger on current major (4th) version

@injectable()
export class LoggerService {
    public logger: Logger<ILogObj>

    constructor() {
        this.logger = new Logger<ILogObj>({
        })
    }

    log(...args: unknown[]) {
        this.logger.info(...args)
    }
    error(...args: unknown[]) {
        this.logger.error(...args)
    }
    warn(...args: unknown[]) {
        this.logger.warn(...args)
    }
}
