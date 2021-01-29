import {
  Controller,
  Body,
  Post,
  HttpException,
  HttpStatus,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateUsuarioDto } from 'src/dto/create-usuario.dto';
import { LoginUsuarioDto } from 'src/dto/loginUsuarioDto';
import { AuthService } from '../auth/auth.service';
import { LoginStatus } from '../auth/interfaces/login-status.interface';
import { RegistrationStatus } from '../auth/interfaces/registration-status.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { RoleService } from '../services/role.service';
import { Role } from '../domain/entity/role.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(
    @Body() createUserDto: CreateUsuarioDto,
  ): Promise<RegistrationStatus> {
    const result: RegistrationStatus = await this.authService.register(
      createUserDto,
    );

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  @Post('login')
  public async login(
    @Body() loginUserDto: LoginUsuarioDto,
  ): Promise<LoginStatus> {
    return await this.authService.login(loginUserDto);
  }

  @Get('currentUser')
  @UseGuards(JwtAuthGuard)
  public async testAuth(
    @Req() req: any,
  ): Promise<{
    id: number;
    email: string;
    username: string;
  }> {
    return {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
    };
  }

  @UseGuards(AuthGuard('jwt-refreshtoken'))
  @Post('auth/refreshToken')
  async refreshToken(@Req() req) {
    return await this.authService.refresh(req.user);
  }
}
