import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInAuthDto } from './dto/signIn-auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  create(@Body() signInAuthDto: SignInAuthDto) {
    return this.authService.validateUser(signInAuthDto.email, signInAuthDto.password);
  }
}
