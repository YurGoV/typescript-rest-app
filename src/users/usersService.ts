import { injectable } from 'inversify';
import { UserLoginDto } from './dto/userLoginDto';
import { UserRegisterDto } from './dto/userRegisterDto';
import { User } from './userEntity';
import { IUserService } from './usersServiceInterface';

@injectable()
export class UserService implements IUserService {
  // CreateUser: (dto: UserRegisterDto) => User | null;
  async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
    const newUser = new User(email, name);
    await newUser.setPassword(password);
    // check if user is...
    return null;
  }

  async validateUser(dto: UserLoginDto): Promise<boolean> {
    return true;
  }
}
