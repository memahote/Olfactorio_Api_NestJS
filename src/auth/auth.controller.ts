import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/_utils/decorators/public.decorator';
import { RegisterDto } from './_utils/dtos/requests/register.dto';
import { LoginDto } from './_utils/dtos/requests/login.dto';
import { RefreshTokenDto } from './_utils/dtos/requests/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  
  @Public()
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('refresh-token')
  refreshToken(@Body() refreshToken: RefreshTokenDto) {
    return this.authService.rotateRefreshToken(refreshToken);
  }
}
