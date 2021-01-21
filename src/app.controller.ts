import { Controller, Get, UseGuards, Post, Request } from "@nestjs/common";
import { AppService } from "./app.service";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth/auth.service";

@Controller()
export class AppController {
  private authService: AuthService;

  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard("jwt-refreshtoken"))
  @Post("auth/refreshtoken")
  async refreshToken(@Request() req) {
    return await this.authService.login(req.user);
  }
}
