import express, { Express } from 'express';
import { Server } from 'http';
import { UserController } from './users/usersController';
import { ExeptionFilter } from './errors/exeptionFilter';
import { inject, injectable } from 'inversify';
import { ILogger } from './logger/loggerInterface';
import { TYPES } from './types';
import 'reflect-metadata';

@injectable()
export class App {
  app: Express;

  server: Server;

  port: number;

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.UserController) private userController: UserController,
    @inject(TYPES.ExeptionFilter) private exeptionFilter: ExeptionFilter
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
  public init(): void {
    this.useMiddleware();
    this.useRoutes();
    this.useExeptionFilters();
    this.server = this.app.listen(this.port);
    this.logger.log(`Server started on http://localhost:${this.port}`);
  }
}
