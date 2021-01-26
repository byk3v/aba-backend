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
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';
import { LoginUsuarioDto } from 'src/usuarios/dto/loginUsuarioDto';
import { AuthService } from './auth.service';
import { LoginStatus } from './interfaces/login-status.interface';
import { RegistrationStatus } from './interfaces/registration-status.interface';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { RoleService } from '../role/role.service';
import { Role } from '../role/entities/role.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly roleService: RoleService,
  ) {}

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
    roles: Role[];
    id: number;
    email: string;
    username: string;
  }> {
    const roles = await this.roleService.findRolesbyUser(req.user.id);
    return {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      roles: roles,
    };
  }

  @UseGuards(AuthGuard('jwt-refreshtoken'))
  @Post('auth/refreshToken')
  async refreshToken(@Req() req) {
    return await this.authService.refresh(req.user);
  }
}
