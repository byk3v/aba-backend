import {IsString, IsEmail, IsNotEmpty} from 'class-validator';

export class LoginUsarioDto
{
    @IsNotEmpty()  readonly username: string;
    @IsNotEmpty()  readonly password: string;
}