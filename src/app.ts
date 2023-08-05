import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { ILogger } from './logger/loggerInterface';
import { TYPES } from './types';
import 'reflect-metadata';
import { IConfigService } from './config/configServiceInterface';
import { UserController } from './users/usersController';
import { IExeptionFilter } from './errors/exeptionFilterInterface';
import { PrismaService } from './database/prismaService';

@injectable()
export class App {
  app: Express;

  server: Server;

  port: number;

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.UserController) private userController: UserController,
    @inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.PrismaService) private prismaService: PrismaService
  ) {
    this.app = express();
    this.port = 8000;
  }

  useMiddleware(): void {
    this.app.use(express.json());
  }

  useRoutes(): void {
    this.app.use('/users', this.userController.router);
  }

  useExeptionFilters(): void {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
  }

  // public async init(): void {
  public async init(): Promise<void> {
    this.useMiddleware();
    this.useRoutes();
    this.useExeptionFilters();
    await this.prismaService.connect();
    this.server = this.app.listen(this.port);
    this.logger.log(`Server started on http://localhost:${this.port}`);
  }
}
