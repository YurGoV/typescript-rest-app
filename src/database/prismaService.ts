import { PrismaClient, UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/loggerInterface';

@injectable()
export class PrismaService {
  client: PrismaClient;

  constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    this.client = new PrismaClient();
  }

  async connect(): Promise<void> {
    try {
      await this.client.$connect();
      this.logger.log('db connected success');
    } catch (e) {
      if (e instanceof Error) {
        this.logger.error('[PrismaService] error when try to connect to db: ' + e.message);
      }
    }
  }

  async disconnect(): Promise<void> {
    await this.client.$disconnect();
  }
}
