import { inject, injectable } from 'inversify';
import { UserLoginDto } from './dto/userLoginDto';
import { UserRegisterDto } from './dto/userRegisterDto';
import { User } from './userEntity';
import { IUserService } from './usersServiceInterface';
import { TYPES } from '../types';
import { IConfigService } from '../config/configServiceInterface';

@injectable()
export class UserService implements IUserService {
  constructor(@inject(TYPES.ConfigService) private configService: IConfigService) {}

  // CreateUser: (dto: UserRegisterDto) => User | null;
  async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
    const newUser = new User(email, name);
    const salt = this.configService.get('SALT');
    console.log(salt);
    await newUser.setPassword(password, Number(salt));
    // check if user is...
    return null;
  }

  async validateUser(dto: UserLoginDto): Promise<boolean> {
    return true;
  }
}
