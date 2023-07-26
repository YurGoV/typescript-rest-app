import { Container, ContainerModule, interfaces } from 'inversify'
import { App } from './app'
import { ILogger } from './logger/loggerInterface'
import { IExeptionFilter } from './errors/exeptionFilterInterface'
import { ExeptionFilter } from './errors/exeptionFilter'
import { LoggerService } from './logger/loggerService'
import { UserController } from './users/usersController'
import { TYPES } from './types'

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
    bind<ILogger>(TYPES.ILogger).to(LoggerService)
    bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter)
    bind<UserController>(TYPES.UserController).to(UserController)
    bind<App>(TYPES.Application).to(App)
})

function bootstrap() {
    const appContainer = new Container()
    appContainer.load(appBindings)
    const app = appContainer.get<App>(TYPES.Application)
    app.init()

    return { appContainer, app }
}





export const { app, appContainer } = bootstrap()
