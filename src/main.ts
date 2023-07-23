import { App } from './app'
import { LoggerService } from './logger/loggerService'
import { UserController } from './users/usersController'


async function bootstrap() {
    const logger = new LoggerService()
    const app = new App(logger, new UserController(logger))
    await app.init()
}

bootstrap()
