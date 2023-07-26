import { Container } from 'inversify'
import { App } from './app'
import { ILogger } from './logger/loggerInterface'
import { IExeptionFilter } from './errors/exeptionFilterInterface'
import { ExeptionFilter } from './errors/exeptionFilter'
import { LoggerService } from './logger/loggerService'
import { UserController } from './users/usersController'
import { TYPES } from './types'


// async function bootstrap() {
    // const logger = new LoggerService()
    // const app = new App(
    //     logger,
    //     new UserController(logger),
    //     new ExeptionFilter(logger),
    // )

    const appContainer = new Container()
    appContainer.bind<ILogger >(TYPES.ILogger).to(LoggerService)
    appContainer.bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter)
    appContainer.bind<UserController>(TYPES.UserController).to(UserController)
    appContainer.bind<App>(TYPES.Application).to(App)

    const app = appContainer.get<App>(TYPES.Application)
    app.init()
// }
// bootstrap()
export {app, appContainer}
