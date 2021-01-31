// import { IsString, IsEmail } from 'class-validator';

export interface CreateUserDto {
  // @IsString()
  username: string;

  password: string;

  // @IsEmail()
  email: string;

  roles: string[];
}
