import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-strategy/auth.local.guards';
import { JwtAuthGuard } from './auth/jwt-strategy/auth.jwt.guards';
import { AuthService } from './auth/auth.service';
import { AppService } from './app.service';
import { Public } from './utils/utils';
import { ResetPasswordUserDto } from './products/users/dto/reset-password-user.dto';
import { Body } from '@nestjs/common/decorators';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('auth/register')
  async register(@Request() req) {
    return this.authService.register(req.body);
  }
  
  @Public()
  @Post('auth/checkDataPassword')
  async checkDataPassword(@Body() resetPasswordUser: ResetPasswordUserDto) {
    return this.authService.checkDataResetPassword(resetPasswordUser);
  }
  
  @Public()
  @Post('auth/resetPassword')
  async resetPassword(@Body() resetPasswordUser: ResetPasswordUserDto) {
    return this.authService.resetPassword(resetPasswordUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Get("/version")
  getVersion(): string {
    return this.appService.getVersion();
  }
}
