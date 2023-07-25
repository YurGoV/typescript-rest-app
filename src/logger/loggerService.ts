import { Logger, ILogObj } from 'tslog'

//TODO: setup logger on current major (4th) version
export class LoggerService {
    public logger: Logger<ILogObj>

    constructor() {
        this.logger = new Logger<ILogObj>({
            // prettyLogTemplate: "{{yyyy}}.{{mm}}.{{dd}} {{hh}}:{{MM}}:{{ss}}:{{ms}}\t{{logLevelName}}\t[{{fileNameWithLine}}{{name}}]\t",
            // prettyErrorTemplate: "\n{{errorName}} {{errorMessage}}\nerror stack:\n{{errorStack}}",
            // prettyErrorStackTemplate: "  • {{fileName}}\t{{method}}\n\t{{filePathWithLine}}",
            // prettyErrorParentNamesSeparator: ":",
            // prettyErrorLoggerNameDelimiter: "\t",
            // stylePrettyLogs: true,
            // prettyLogTimeZone: "UTC",
            // prettyLogStyles: {
            //     logLevelName: {
            //         "*": ["bold", "black", "bgWhiteBright", "dim"],
            //         SILLY: ["bold", "white"],
            //         TRACE: ["bold", "whiteBright"],
            //         DEBUG: ["bold", "green"],
            //         INFO: ["bold", "blue"],
            //         WARN: ["bold", "yellow"],
            //         ERROR: ["bold", "red"],
            //         FATAL: ["bold", "redBright"],
            //     },
            //     dateIsoStr: "white",
            //     filePathWithLine: "white",
            //     name: ["white", "bold"],
            //     nameWithDelimiterPrefix: ["white", "bold"],
            //     nameWithDelimiterSuffix: ["white", "bold"],
            //     errorName: ["bold", "bgRedBright", "whiteBright"],
            //     fileName: ["yellow"],
            //     fileNameWithLine: "white",
            // },
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
