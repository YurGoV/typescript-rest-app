import { UserModel } from '@prisma/client';
import { User } from './userEntity';

export interface IUsersRepository {
  create: (user: User) => Promise<UserModel>;
  find: (email: string) => Promise<UserModel | null>;
}
