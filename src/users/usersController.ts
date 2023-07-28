import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/baseController';
import { HTTPError } from '../errors/httpErrorClass';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/loggerInterface';
import { TYPES } from '../types';
import 'reflect-metadata';
import { IUserController } from './usersControllerInterface';
import { UserLoginDto } from './dto/userLoginDto';
import { UserRegisterDto } from './dto/userRegisterDto';
import { User } from './userEntity';

@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
    super(loggerService);
    this.bindRoutes([
      { path: '/register', method: 'post', func: this.register },
      { path: '/login', method: 'post', func: this.login },
    ]);
  }

  login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
    console.log(req.body);
    // this.ok(res, 'login')
    next(new HTTPError(401, 'auth error message', 'login'));
  }

  async register(
    { body }: Request<{}, {}, UserRegisterDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    // console.log(body);
    const newUser = new User(body.email, body.name);
    await newUser.setPassword(body.password);
    this.ok(res, newUser);
  }
}
