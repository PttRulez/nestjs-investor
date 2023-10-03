import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Session,
} from '@nestjs/common';
import { AuthDto, LoginDto } from './dto';
import { AuthService } from './auth.service';
import { UserSession } from './types';
import { Role } from '@prisma/client';
import { PublicRoute } from './decorators';

@PublicRoute()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: AuthDto) {
    const { email, password, name, role } = dto;
    return this.authService.register({
      email,
      password,
      name,
      role,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Session() session: UserSession) {
    const user = await this.authService.login({
      email: loginDto.email,
      password: loginDto.password,
    });
    this.serializeSession(user.id, user.email, user.role, session);
  }

  private serializeSession(
    id: number,
    email: string,
    role: Role,
    session: UserSession,
  ) {
    session.user = { id, email, role };
  }
}
