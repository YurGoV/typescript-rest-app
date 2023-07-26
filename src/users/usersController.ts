import { NextFunction, Request, Response } from "express";
import { BaseController } from "../common/baseController";
import { LoggerService } from "../logger/loggerService";
import { HTTPError } from "../errors/httpErrorClass";
import { inject, injectable } from "inversify";
import { ILogger } from "../logger/loggerInterface";
import { TYPES } from "../types";
import 'reflect-metadata'

@injectable()
export class UserController extends BaseController {
    constructor(
        @inject(TYPES.ILogger) private loggerService: ILogger 
    ) {
        super(loggerService)
        this.bindRoutes([
            { path: '/register', method: 'post', func: this.register },
            { path: '/login', method: 'post', func: this.login },
        ])
    }


    login(req: Request, res: Response, next: NextFunction) {
        // this.ok(res, 'login')
        next(new HTTPError(401, 'auth error message', 'login'))
    }

    register(req: Request, res: Response, next: NextFunction) {
        this.ok(res, 'register')
    }
}
