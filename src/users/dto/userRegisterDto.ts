import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
  @IsEmail({}, { message: 'wrong email' })
    email: string;

  @IsString({ message: 'No password given' })
  password: string;

  @IsString({ message: 'No name given' })
    name: string;
}
