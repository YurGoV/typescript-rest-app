import { inject, injectable } from 'inversify';
import { UserLoginDto } from './dto/userLoginDto';
import { UserRegisterDto } from './dto/userRegisterDto';
import { User } from './userEntity';
import { IUserService } from './usersServiceInterface';
import { TYPES } from '../types';
import { IConfigService } from '../config/configServiceInterface';
import { IUsersRepository } from './usersRepositoryInterface';
import { UserModel } from '@prisma/client';

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.UsersRepository) private usersRepository: IUsersRepository
  ) {}

  // CreateUser: (dto: UserRegisterDto) => User | null;
  async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
    const newUser = new User(email, name);
    const salt = this.configService.get('SALT');
    console.log(salt);
    await newUser.setPassword(password, Number(salt));
    // check if user is...
    const existedUser = await this.usersRepository.find(email);
    if (existedUser) {
      return null;
    }
    return this.usersRepository.create(newUser);
  }

  async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
    const existedUser = await this.usersRepository.find(email);
    if (!existedUser) {
      return false;
    }
    const newUser = new User(existedUser.email, existedUser.name, existedUser.password);
    return newUser.comparePassword(password);
  }
}
