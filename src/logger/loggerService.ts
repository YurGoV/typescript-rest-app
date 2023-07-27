import { ILogObj, Logger } from 'tslog';
import { injectable } from 'inversify';
import 'reflect-metadata';

//TODO: setup logger on current major (4th) version

@injectable()
export class LoggerService {
  public logger: Logger<ILogObj>;

  constructor() {
    this.logger = new Logger<ILogObj>({});
  }

  log(...args: unknown[]): void {
    this.logger.info(...args);
  }

  error(...args: unknown[]): void {
    this.logger.error(...args);
  }

  warn(...args: unknown[]): void {
    this.logger.warn(...args);
  }
}
