import { Controller, Body, Post, HttpException, HttpStatus, UsePipes, Get, Req, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';
import { LoginUsarioDto } from 'src/usuarios/dto/LoginUsarioDto';
import { AuthService } from './auth.service';
import { LoginStatus } from './interfaces/login-status.interface';
import { JwtPayload } from './interfaces/payload.interface';
import { RegistrationStatus } from './interfaces/registration-status.interface';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('register')
    public async register( @Body() createUserDto: CreateUsuarioDto,): Promise<RegistrationStatus> {
        const result: RegistrationStatus = await this.authService.register( createUserDto);

        if (!result.success) {
        throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
        }

        return result;
    }

    @Post('login')
    public async login(@Body() loginUserDto: LoginUsarioDto): Promise<LoginStatus> {
        return await this.authService.login(loginUserDto);
    }

    /*@Get('whoami')
    @UseGuards(AuthGuard())
    public async testAuth(@Req() req: any): Promise<JwtPayload> {
        return req.user;
    }*/

}