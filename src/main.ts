import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { ILogger } from './logger/loggerInterface';
import { IExeptionFilter } from './errors/exeptionFilterInterface';

import { ExeptionFilter } from './errors/exeptionFilter';
import { LoggerService } from './logger/loggerService';
import { UserController } from './users/usersController';
import { TYPES } from './types';
import { IUserService } from './users/usersServiceInterface';
import { IUserController } from './users/usersControllerInterface';
import { UserService } from './users/usersService';
import { IConfigService } from './config/configServiceInterface';
import { ConfigService } from './config/configService';
import { PrismaService } from './database/prismaService';

export interface IBootstrapReturn {
  appContainer: Container;
  app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
  bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
  bind<IUserController>(TYPES.UserController).to(UserController);
  bind<IUserService>(TYPES.UserService).to(UserService);
  bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
  bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
  bind<App>(TYPES.Application).to(App);
});

function bootstrap(): IBootstrapReturn {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.Application);
  app.init();

  return { appContainer, app };
}

export const { app, appContainer } = bootstrap();
