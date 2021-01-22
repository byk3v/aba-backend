import { Controller, Get,UseGuards,Post,Request } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth/auth.service";

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('jwt-refreshtoken'))
  @Post('auth/refreshToken')
  async refreshToken(@Request() req){
    return await this.authService.refresh(req.user);
  }
}
