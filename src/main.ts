import { App } from './app'
import { ExeptionFilter } from './errors/exeptionFilter'
import { LoggerService } from './logger/loggerService'
import { UserController } from './users/usersController'


async function bootstrap() {
    const logger = new LoggerService()
    const app = new App(
        logger,
        new UserController(logger),
        new ExeptionFilter(logger),
    )
    await app.init()
}

bootstrap()
