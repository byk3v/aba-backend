import {
  Controller,
  Body,
  Post,
  HttpException,
  HttpStatus,
  UsePipes,
  Get,
  Req,
  UseGuards, HttpCode
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateUsuarioDto } from "src/usuarios/dto/create-usuario.dto";
import { LoginUsuarioDto } from "src/usuarios/dto/loginUsuarioDto";
import { AuthService } from "./auth.service";
import { LoginStatus } from "./interfaces/login-status.interface";
import { JwtPayload } from "./interfaces/payload.interface";
import { RegistrationStatus } from "./interfaces/registration-status.interface";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post("register")
  public async register(
    @Body() createUserDto: CreateUsuarioDto
  ): Promise<RegistrationStatus> {
    const result: RegistrationStatus = await this.authService.register(
      createUserDto
    );

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  @Post("login")
  public async login(
    @Body() loginUserDto: LoginUsuarioDto
  ): Promise<LoginStatus> {
    return await this.authService.login(loginUserDto);
  }

  @Post("refreshToken")
  public async refresh(
    @Body() loginUserDto: LoginUsuarioDto
  ): Promise<LoginStatus> {
    return await this.authService.login(loginUserDto);
  }

  @Get("currentUser")
  @UseGuards(JwtAuthGuard)
  public async testAuth(@Req() req: any): Promise<{ country: string; address: string; signature: string; unreadCount: number; avatar: string; title: string; userid: string; notifyCount: number; geographic: { province: { label: string; key: string }; city: { label: string; key: string } }; phone: string; name: string; email: string; username: string; group: string }> {
    return {
      ...req.user
    };
  }

  @UseGuards(AuthGuard('jwt-refreshtoken'))
  @Post('auth/refreshtoken')
  async refreshToken(@Req() req){
    return await this.authService.login(req.user);
  }
}
