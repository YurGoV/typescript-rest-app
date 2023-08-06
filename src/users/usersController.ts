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
import { ValidateMiddleware } from '../common/validateMiddleware';
import { sign } from 'jsonwebtoken';
import { IConfigService } from '../config/configServiceInterface';
import { IUserService } from './usersServiceInterface';

@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.UserService) private userService: IUserService,
    @inject(TYPES.ConfigService) private configService: IConfigService
  ) {
    super(loggerService);
    this.bindRoutes([
      {
        path: '/register',
        method: 'post',
        func: this.register,
        middlewares: [new ValidateMiddleware(UserRegisterDto)],
      },
      {
        path: '/login',
        method: 'post',
        func: this.login,
        middlewares: [new ValidateMiddleware(UserLoginDto)],
      },
    ]);
  }

  async login(
    req: Request<{}, {}, UserLoginDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const result = await this.userService.validateUser(req.body);
    if (!result) {
      return next(new HTTPError(401, 'auth error message', 'login'));
    }
    const jwt = await this.signJwt(req.body.email, this.configService.get('SECRET'));
    this.ok(res, { jwt });
  }

  async register(
    { body }: Request<{}, {}, UserRegisterDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    // console.log(body);
    const result = await this.userService.createUser(body);
    if (!result) {
      return next(new HTTPError(422, 'the same user is exist'));
    }
    this.created(res, { email: result.email, id: result.id });
  }

  private signJwt(email: string, secret: string): Promise<string> {
    return new Promise((resolve, reject) => {
      sign(
        {
          email,
          iat: Math.floor(Date.now() / 1000),
        },
        secret,
        {
          algorithm: 'HS256',
        },
        (err, token) => {
          if (err) {
            reject(err);
          }
          resolve(token as string);
        }
      );
    });
  }
}
