import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/loggerInterface';
import { TYPES } from '../types';
import { IConfigService } from './configServiceInterface';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';

@injectable()
export class ConfigService implements IConfigService {
  private config: DotenvParseOutput;

  constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    const result: DotenvConfigOutput = config();
    if (result.error) {
      this.logger.error('[ConfigService] can`t reed .env file or it is no present');
    } else {
      this.logger.log('[ConfigService] .env config successfully loaded');
      this.config = result.parsed as DotenvParseOutput;
    }
  }

  get(key: string): string {
    return this.config[key];
  }
}
