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

  @UseGuards(AuthGuard('jwt-refreshtoken'))
  @Post("refreshToken")
  async refreshToken(@Req() req){
    return await this.authService.login(req.user);
  }

  @Get("currentUser")
  @UseGuards(JwtAuthGuard)
  public async testAuth(@Req() req: any): Promise<{ email: string; username: string; id: number }> {
    return {
      id:	req.user.id,
      username:	req.user.username,
      email:	req.user.email
    };
  }

}
