import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUsuarioDto {
  @IsNotEmpty() readonly username: string;
  @IsNotEmpty() readonly password: string;
}
