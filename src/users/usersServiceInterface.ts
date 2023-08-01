import { User } from './userEntity';
import { UserRegisterDto } from './dto/userRegisterDto';
import { UserLoginDto } from './dto/userLoginDto';

export interface IUserService {
  createUser: (dto: UserRegisterDto) => Promise<User | null>;
  validateUser: (dto: UserLoginDto) => Promise<boolean>;
}
